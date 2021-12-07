// Определяем константы для текущего файла.
const CARET = "^";
const COLON = ":";
const UNDERSCORE = "_";

// Данная функция преобразует контекст в строки с расположением файла.
const importAll = (r) =>
  r.keys().map((key) => key.slice(2).replace(".vue", "").split("/"));

// Так как нет возможности обратиться из браузера к файловой системе, мы воспользуемся функцией webpack require.context. Данная функция позволяет передать каталог для поиска, флаг, указывающий, следует ли искать и подкаталоги, и регулярное выражение для сопоставления файлов.
const pages = importAll(require.context("../views", true, /\.vue$/));

// Это ключевая функция, которая отвечает за создание конкретного маршрута.
const generateRoute = (path) => {
  // Блок для обработки корневых директорий, которые начинаются с index. Например: файл views/index/*
  if (path[0].toLowerCase().startsWith("index") && path.length > 1) {
    path.shift();
  }

  // Блок обработки корневых файлов. Например: файлы views/Index.vue, views/User.vue
  if (path.length === 1) {
    const shortcut = path[0].toLowerCase();
    return shortcut.startsWith("index")
      ? ""
      : shortcut.startsWith(UNDERSCORE)
      ? shortcut.replace(UNDERSCORE, COLON)
      : shortcut;
  }

  // Блок обработки всех остальных маршрутов.
  const lastElement = path[path.length - 1];

  // Обработка файлов */Index.vue
  if (lastElement.toLowerCase().startsWith("index")) {
    path.pop();

    // Обработка динамических маршрутов.
  } else if (lastElement.startsWith(UNDERSCORE)) {
    path[path.length - 1] = lastElement.replace(UNDERSCORE, COLON);
  }
  return path.map((p) => p.toLowerCase()).join("/");
};

// Определяем правило определения дочерних маршрутов.
const childrenFilter = (p) => ~p.indexOf(CARET);

// Функция для обработки дочерних маршрутов.
const childrenByPath = pages
  .filter((path) => path.some(childrenFilter))
  .map((path) => {
    // Note: copy path and remove special char ^
    const copy = [...path];
    copy[copy.length - 1] = copy[copy.length - 1].slice(1);
    const key = `/${generateRoute(copy.slice(0, copy.length - 1))}`;
    return {
      path,
      route: `/${generateRoute(copy)}`,
      key,
    };
  })
  .reduce((acc, cur) => {
    const key = cur.key;
    delete cur.key;
    if (acc[key]) {
      acc[key].push(cur);
    } else {
      acc[key] = [cur];
    }
    return acc;
  }, {});

// Определение дефолтного лейаута.
const defaultLayout = "AppLayoutMain";

// Имя файла страницы 404.
const notFoundPage = "NotFound";

// Обработка специального случая для страницы 404.
const handleNotFoundPage = async () => {
  const module = await import(`../views/${notFoundPage}.vue`);
  const component = await module.default;
  return {
    path: "*",
    component,
  };
};

// Возвращаем обработанные страницы.
export default pages

  // Удаляем дочерние страницы из массива.
  .filter((path) => !path.some(childrenFilter))

  // Преобразуем страницы (строки) в маршруты.
  .map(async (path) => {
    if (path.includes(notFoundPage)) {
      return await handleNotFoundPage();
    }

    // Получаем компонент vue.
    const { default: component } = await import(`../views/${path.join("/")}`);

    // Получаем свойства из компонента.
    const { layout, middlewares, name } = component;

    // Создаём маршрут.
    const route = `/${generateRoute([...path])}`;

    // Добавляем дочерние маршруты.
    let children = [];
    if (childrenByPath[route]) {
      const promises = childrenByPath[route].map(async ({ path, route }) => {
        const { default: childComponent } = await import(
          `../views/${path.join("/")}`
        );
        const {
          layout: childLayout,
          middlewares: childMiddleware,
          name: childName,
        } = component;
        return {
          path: route,
          name: childName,
          component: childComponent,
          meta: {
            layout: childLayout || defaultLayout,
            middlewares: childMiddleware || {},
          },
        };
      });
      children = await Promise.all(promises);
    }
    return {
      path: route,
      name,
      component,
      meta: {
        layout: layout || defaultLayout,
        middlewares: middlewares || {},
      },
      children,
    };
  });
