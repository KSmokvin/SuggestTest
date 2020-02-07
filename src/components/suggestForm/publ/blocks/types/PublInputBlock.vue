<template>
  <div class="block block-publ mb-3" :class="'block-'+initBlock.type">
    <div class="block-publ__header">
      <i
        v-if="initBlock.hint"
        @click="expandedHint = !expandedHint"
        class="fas fa-info-circle fa-color fa-color-hover block-publ__hint-toggler"
        title="Нажмите сюда, чтобы ознакомиться с рекомендациями по заполнению этого поля"
      ></i>
      <div v-if="initBlock.title" class="block-publ__title">
        {{initBlock.title}}
        <span
          v-if="initBlock.required"
          class="block-publ__required"
          title="Обязательно к заполнению"
        >*</span>
      </div>
    </div>
    <div v-if="expandedHint" class="block-publ__hint">{{initBlock.hint}}</div>
    <template v-if="initBlock.format==='textarea'">
      <b-textarea
        max-rows="8"
        :required="initBlock.required"
        :placeholder="initBlock.placeholder"
        v-model="value"
      ></b-textarea>
    </template>

    <template v-if="initBlock.format==='input'">
      <b-input
        :minlength="initBlock.length.min"
        :maxlength="initBlock.length.max"
        :required="initBlock.required"
        :placeholder="initBlock.placeholder"
        v-model="value"
      ></b-input>
    </template>

    <template v-if="initBlock.format==='number'">
      <b-input
        :min="initBlock.range.min"
        :max="initBlock.range.max"
        type="number"
        :required="initBlock.required"
        :placeholder="initBlock.placeholder"
        v-model="value"
      ></b-input>
    </template>
  </div>
</template>


<script>
export default {
  components: {},
  props: {
    initBlock: {
      type: Object,
      required: true
    }
  },
  computed: {
    value: {
      get() {
        return this.initBlock.value;
      },
      set(value) {
        this.updateBlock("value", value);
      }
    }
  },
  data: function() {
    return {
      expandedHint: false
    };
  },
  created() {},
  methods: {
    updateBlock: function(prop, value) {
      this.$store.commit("updateBlock", {
        prop: prop,
        value: value,
        blockId: this.initBlock.id
      });
    }
  }
};
</script>

<style>
</style>