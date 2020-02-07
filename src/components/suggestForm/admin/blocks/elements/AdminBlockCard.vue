<template>
  <b-card no-body class="block mb-2" :class="'block-'+initBlock.type">
    <!--  BLOCK HEADER  -->
    <b-card-header header-tag="header" class="p-0" role="tab">
      <b-button
        block
        href="#"
        v-b-toggle="initBlock.id+'-body'"
        variant="light"
        class="d-flex justify-content-between py-2 px-3 no-shadow text-left"
      >
        <div>
          <template v-if="initBlock.title">
            <div>
              <i class="fas fa-fw fa-grip-vertical block__drag"></i>
              {{initBlock.title}}
            </div>
            <small class="opacity-60 ml-4">{{blockTypeName}}</small>
          </template>
          <template v-else>
            <div class="mt-1">
              <i class="fas fa-fw fa-grip-vertical block__drag"></i>
              {{blockTypeName}}
            </div>
          </template>
        </div>
        <div>
          <b-button
            href="#"
            size="sm"
            variant="link"
            @click.stop="$store.commit('removeBlock', initBlock.id)"
          >
            <i class="fas fa-trash-alt fa-fw" title="Удалить поле"></i>
          </b-button>
        </div>
      </b-button>
    </b-card-header>
    <!--  / BLOCK HEADER  -->
    <!--  BLOCK CONTENT  -->
    <b-collapse :id="initBlock.id+'-body'" v-model="expanded" role="tabpanel">
      <b-card-body>
        <slot></slot>
      </b-card-body>
    </b-collapse>
    <!--  / BLOCK CONTENT  -->
  </b-card>
</template>


<script>
export default {
  props: {
    initBlock: {
      type: Object,
      required: true
    }
  },
  created: function() {
    this.$eventBus.$on("addBlock", this.expandJustCreatedBlock);
  },
  computed: {
    blockTypeName: function() {
      let blockTypeNames = {
        input: "Текстовое поле",
        text: "Инфоблок"
      };
      return blockTypeNames[this.initBlock.type];
    }
  },
  data: function() {
    return {
      expanded: false
    };
  },
  methods: {
    expandJustCreatedBlock(blockId) {
      if (blockId === this.initBlock.id) {
        this.expanded = true;
      }
    }
  }
};
</script>
