<template>
  <div class="blocks">
    <template v-if="allBlocks.length">
      <draggable v-model="allBlocks" group="blocks" handle=".block__drag">
        <component
          v-for="block in allBlocks"
          :is="defineComponent(block.type)"
          :key="block.id"
          :init-block="block"
          ref="block"
        />
      </draggable>
    </template>
    <template v-else>
      <b-card class="px-5 py-5 text-center">
        <b-card-text>
          <p
            class="mb-0"
          >Используйте кнопки ниже, чтобы добавить нужные поля, которые будут заполнять пользователи при добавлении предложенной новости.</p>
        </b-card-text>
      </b-card>
    </template>
    <!-- <AdminAddForm @add="addBlock" :entityName="'block'"/> -->
    <div class="blocks__add-buttons mt-4">
      <button class="btn btn-info mr-2" @click="$store.dispatch('addBlock', { type:'input' })">
        <small>
          <i class="fas fa-plus mr-1"></i> Текстовое поле
        </small>
      </button>
      <button class="btn btn-info mr-2" @click="$store.dispatch('addBlock', { type:'text' })">
        <small>
          <i class="fas fa-plus mr-1"></i> Инфоблок
        </small>
      </button>
      <button class="btn btn-info mr-2" @click="$store.dispatch('addBlock', { type:'select' })">
        <small>
          <i class="fas fa-plus mr-1"></i> Выбор варианта
        </small>
      </button>
    </div>
    <div class="well mt-4">{{allBlocks}}</div>
    <div class="well mt-4">{{vkApp}}</div>
    <div class="well mt-4">{{vkGroup}}</div>
    <div class="well mt-4">{{vkUser}}</div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import AdminInputBlock from "./types/AdminInputBlock.vue";
// import AdminCheckboxesBlock from "./CheckboxesBlock.vue";
// import AdminRadiosBlock from "./RadiosBlock.vue";
// import AdminAddForm from "../elements/AddForm.vue";

export default {
  components: {
    draggable,
    AdminInputBlock
    // AdminCheckboxesBlock,
    // AdminRadiosBlock,
    // AdminAddForm,
  },

  computed: mapGetters(["allBlocks", "vkApp", "vkGroup", "vkUser"]),
  methods: {
    ...mapActions(["addBlock"]),
    defineComponent(blockType) {
      const componentNames = {
        input: "AdminInputBlock"
        // checkboxes: "AdminCheckboxesBlock",
        // radios: "AdminRadiosBlock"
      };
      return componentNames[blockType];
    }
  }
};
</script>

<style>
.block-setting {
  display: flex;
  align-items: center;
  min-height: 38px;
  margin-top: 0.25rem;
}
.block-setting:first-child {
  margin-bottom: 0;
}
.block-setting__label {
  white-space: nowrap;
  margin-right: 0.5rem;
  min-width: 160px;
}
.block-setting__label-text {
  display: inline-block;
  white-space: nowrap;
  color: #607d8b;
}
.block-setting__label-icon {
  margin: 2px 0.5rem 0 0;
  color: #b0bec5;
  transition: 0.2s;
  cursor: help;
}
.block-setting__label-icon:hover {
  color: #007bff;
}
.block-setting__body {
  width: 100%;
}
.block-setting__body input,
.block-setting__body textarea,
.block-setting__body select {
  margin-left: -0.5rem;
  cursor: pointer;
}
.block-setting__body .custom-control {
  cursor: pointer;
}
</style>
