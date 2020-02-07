import mixin from "../../assets/mixin/index";

export default {
  actions: {
    async fetchBlocks(ctx) {
      // const res = await fetch("url");
      // const blocks = await res.json();
      const blocks = [
        {
          id: 1111,
          title: "Зебра",
          type: "input",
          format: "input",
          hint: "Подсказка по заполнению"
        },
        {
          id: 2222,
          title: "Крокодил",
          type: "input"
        }
      ];
      ctx.dispatch("validate", blocks).then(blocks => {
        ctx.commit("updateBlocks", blocks);
      });
    },
    addBlock(ctx, block = {}) {
      ctx.dispatch("checkPermition").then(allowed => {
        if (allowed) {
          // Валидация
          ctx.dispatch("validate", block).then(block => {
            // Добавить новый блок в массив
            ctx.commit("addBlock", block);
            // Отправить событие о создании нового блока
            ctx.dispatch("emitEvent", {
              name: "addBlock",
              data: block.id,
              delay: 0
            });
          });
        }
      });
    },
    validate(ctx, blocks = []) {
      if (!Array.isArray(blocks)) blocks = [blocks];
      blocks.forEach(block => {
        if (!("entity" in block)) {
          block.entity = "block";
        }
        if (!("id" in block)) {
          block.id = mixin.generateId("blk");
        }
        if (!("title" in block)) {
          block.title = "Новое поле";
        }
        if (!("prefix" in block)) {
          block.prefix = { text: "", position: "above" };
        }
        if (!("length" in block)) {
          block.length = { min: "", max: "" };
        }
        if (!("range" in block)) {
          block.range = { min: "", max: "" };
        }
        if (!("format" in block)) {
          block.format = "textarea";
        }
        if (!("offset" in block)) {
          block.offset = true;
        }
      });
      return blocks.length > 1 ? blocks : blocks[0];
    },
    checkPermition(ctx, action) {
      if (ctx.state.blocks.length >= 7) {
        console.log(action);
        console.error("Запрещено больше 7 полей");
        return false;
      }
      return true;
    },
    emitEvent(ctx, event) {
      let $eventBus = this._vm.$eventBus;
      if (event.delay === undefined) {
        $eventBus.$emit(event.name, event.data);
      } else {
        setTimeout(function() {
          $eventBus.$emit(event.name, event.data);
        }, 0);
      }
    }
  },
  mutations: {
    addBlock(state, block) {
      state.blocks.push(block);
    },
    removeBlock(state, blockId) {
      if (blockId === undefined) return;
      let index = state.blocks.findIndex(b => b.id === blockId);
      state.blocks.splice(index, 1);
    },
    updateBlocks(state, blocks) {
      state.blocks = blocks;
    },
    updateBlock(state, data, action = "update") {
      let block = state.blocks.find(b => b.id === data.blockId);
      if (block) {
        if (action === "update") {
          if (!(data.prop in block)) {
            this._vm.$set(block, data.prop, data.value);
          } else {
            block[data.prop] = data.value;
          }
        } else if (action === "remove") {
          delete block[data.prop];
        }
      }
    }
  },
  state: {
    blocks: []
  },
  getters: {
    allBlocks(state) {
      return state.blocks;
    },
    getBlockById: state => id => {
      return state.blocks.find(block => block.id === id);
    },
    postText(state) {
      let text = "";
      state.blocks.forEach(function(b) {
        // Префикс
        if (b.prefix && b.prefix.position && b.prefix.position !== "hidden") {
          let prefixText = b.prefix.text ? b.prefix.text : b.title;
          if (prefixText) {
            if (b.prefix.position === "start") {
              text += prefixText + ": ";
            } else if (b.prefix.position === "above") {
              text += prefixText + ":\n";
            }
          }
        }
        // Значение
        if (b.value !== undefined && b.value !== "") {
          text += b.value + "\n";
        }
        // Отступ
        if (b.offset) {
          text += "\n";
        }
      });

      return text;
    }
  }
};
