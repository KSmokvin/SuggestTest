<template>
  <div class="flex-input d-flex align-items-center">
    <input
      ref="input"
      class="fi-input form-control"
      :class="classes"
      type="text"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('change', $event.target.value)"
    >
    <div ref="suffix" v-if="suffix" class="fi-suffix">{{suffix}}</div>
  </div>
</template>


<script>
export default {
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: String,
    suffix: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    paddingX: {
      type: Number,
      default: 8
    },
    // Отступ суффикса от значения
    suffixOffset: {
      type: Number,
      default: 8
    },
    // Модификатор позволяющий не выходить значению за область видимости при движении стелками влево вправо
    modifier: {
      type: Number,
      default: 3
    },
    classes: {
      type: String,
      default: ""
    }
  },
  watch: {
    value: function() {
      this.autoWidth();
    }
  },
  mounted: function() {
    this.autoWidth();
  },
  methods: {
    autoWidth() {
      const $input = this.$refs.input;

      let inputComputedStyle = getComputedStyle($input);
      let inputText = $input.value || this.placeholder;
      let inputTextWidth = this.getTextWidth(
        inputText,
        inputComputedStyle.font
      );

      let paddingLeft = this.paddingX;
      let paddingRight = this.paddingX;

      if (this.suffix !== "") {
        const $suffix = this.$refs.suffix;
        $suffix.style.font = inputComputedStyle.font;

        let suffixTextWidth = this.getTextWidth(
          this.suffix,
          getComputedStyle($suffix).font
        );
        paddingRight += suffixTextWidth + this.suffixOffset - this.modifier;
        $suffix.style.marginLeft = 0 - this.paddingX - suffixTextWidth + "px";
      }

      $input.style.width =
        inputTextWidth + paddingLeft + paddingRight + this.modifier + "px";
      $input.style.paddingLeft = paddingLeft + "px";
      $input.style.paddingRight = paddingRight + "px";
    },
    getTextWidth(text, font) {
      // re-use canvas object for better performance
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      context.font = font;
      var metrics = context.measureText(text);
      return Math.ceil(metrics.width);
    }
  }
};
</script>

<style>
.fi-suffix {
  pointer-events: none;
}
</style>
