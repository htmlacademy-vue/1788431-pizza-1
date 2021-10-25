<template>
  <div class="text-field">
    <input
      ref="input"
      :value="value"
      :type="type"
      :name="name"
      class="text-field__input"
      :class="{ 'text-field__input--error': showError }"
      :placeholder="placeholder"
      :required="required"
      @input="$emit('input', $event.target.value)"
    />
    <span v-if="showError" class="text-field__text">
      {{ errorText }}
    </span>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showError() {
      return !!this.errorText;
    },
  },
};
</script>

<style lang="scss" scoped>
.text-field {
  position: relative;

  &__input {
    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 12px 16px;

    color: rgba(33, 33, 33, 0.87);
    border: 1px solid #f1f3f4;
    border-radius: 6px;

    &--error {
      border-color: #e53935;
    }

    &:focus {
      border-color: #1e88e5;
    }
  }

  &__text {
    position: absolute;
    bottom: -20px;
    left: 0;

    color: #e53935;
  }
}
</style>
