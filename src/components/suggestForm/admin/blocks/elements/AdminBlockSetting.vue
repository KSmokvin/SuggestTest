<template>
  <div class="block-setting">
    <div class="block-setting__label" :class="{'align-self-start': fixlabel, 'mt-2': fixlabel}">
      <i
        v-if="help"
        class="far fa-question-circle block-setting__label-icon"
        v-b-tooltip.hover
        :title="help"
      ></i>
      <span class="block-setting__label-text">{{label}}</span>
    </div>

    <div class="block-setting__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "help", "fixlabel"],
  data: function() {
    return {};
  },
  methods: {}
};
</script>