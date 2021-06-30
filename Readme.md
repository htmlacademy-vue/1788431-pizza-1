# Личный проект «VuePizza»

* Студент: [Сергей Волков](https://up.htmlacademy.ru/vue/1/user/1788431).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

### Памятка

#### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

#### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

#### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

#### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/intensive/vue"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/javascript/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Vue.js для опытных разработчиков](https://htmlacademy.ru/intensive/vue)» от [HTML Academy](https://htmlacademy.ru).

## Начальные требования
- Docker
- Docker-compose
- NodeJS 10+
- Pre commit (optional)

## Docker документация и установка
https://docs.docker.com/get-docker/
https://dker.ru/docs/ (рус)

## Docker-compose документация и установка
https://docs.docker.com/compose/install/

## Node js документация и установка
https://nodejs.org/en/download/

## Pre-commit документация и установка

- Установить пакет локально следуя инструкциям https://pre-commit.com/#installation
- Выполнить команду `pre-commit install`
- После этого, каждый комит будет проверять правила линтинга и править ошибки

## Frontend установка

- Перейти в директорию

`cd src/frontend`

- Установить зависимости

`$ npm install`

## Backend установка

- Перейти в директорию

`cd src/backend`

- Установить зависимости

`$ npm install`

## Docker установка проекта

- Выполнить команду

`$ docker-compose build .`

- Запустить проект с помощью команды

`$ make start_project`

- Сервер будет запущен по адресу localhost:3000, а клиент по адресу localhost:8080

## Вход для авторизированного пользователя

Мы создали готового пользователя и разместили его в нашей базе данных.
Для входа в систему используйте следующие данные:

```
email: user@example.com
password: user@example.com
```

Вы можете поменять данные пользователя в файле `src/backend/src/factory/users.json`

## Документация эндпоинтов сервера (OpenAPI)
Запустите проект и перейдите по адресу

```
http://localhost:3000/explorer/
```

## Запуск и просмотр готовой верстки проекта

Перейтите в директорию
```
template/
```

Установите зависимости выполнив команду

```
npm install
```

Запустите проект командой

```
npm start
```

Шаблон и верстка будут доступны по адресу `http://localhost:9999`

Верстку можно посмотреть в директории `template/src`
