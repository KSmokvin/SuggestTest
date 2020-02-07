<template>
  <admin-block-card :init-block="initBlock">
    <div class="block-settings">
      <!--  Заголовок  -->
      <admin-block-setting
        label="Название поля"
        help="Краткий заголовок, указывающий пользователям, что вводить в это поле"
      >
        <b-form-input v-model="title" placeholder="Название не заполнено" class="spy bold"></b-form-input>
      </admin-block-setting>
      <!--  / Заголовок  -->
      <!--  Формат  -->
      <admin-block-setting
        label="Формат поля"
        help="В какой форме подразумевается ввод данных в это поле. В зависимости от формата могут измениться внешний вид и дополниительные настройки поля"
      >
        <b-form-select v-model="format" :options="formats" class="spy"></b-form-select>
      </admin-block-setting>
      <!--  / Формат  -->
      <!--  Обязательное  -->
      <admin-block-setting
        label="Обязательное"
        help="Обязательно ли это поле к заполнению перед отправкой формы"
      >
        <b-form-checkbox :id="initBlock.id+'-required'" v-model="required" switch></b-form-checkbox>
      </admin-block-setting>
      <!--  / Обязательное  -->
      <b-collapse :id="initBlock.id+'-hidden-fields'" role="tabpanel">
        <h6 class="mt-4">Дополнительно</h6>
        <!--  Подсказка  -->
        <admin-block-setting
          label="Подсказка"
          help="Краткая подсказка по заполнению этого поля. Будет отображаться полупрозрачным текстом внутри поля"
        >
          <b-form-input
            v-model="placeholder"
            placeholder="Подсказка не заполнена"
            class="spy"
            maxlength="60"
          ></b-form-input>
        </admin-block-setting>
        <!--  / Помощь  -->
        <!--  Помощь  -->
        <admin-block-setting
          label="Помощь"
          help="Подробные рекомендации для пользователей по заполнению этого поля. Будут отображать в свёрнутом виде рядом с полем."
          fixlabel="1"
        >
          <b-form-textarea
            v-model="hint"
            placeholder="Рекомендации не заполнены"
            class="spy"
            max-rows="8"
            :class="{ shyTextareaHeight:!hint }"
          ></b-form-textarea>
        </admin-block-setting>
        <!--  / Помощь  -->
        <!--  Мин длина  -->
        <admin-block-setting
          v-if="initBlock.format === 'input'"
          label="Мин. длина"
          help="Сколько минимально сивмолов нужно ввести в это поле. Установите '0', чтобы убрать ограничение."
        >
          <flex-input
            v-model="length.min"
            type="number"
            placeholder="0"
            suffix="символов"
            classes="spy"
          ></flex-input>
        </admin-block-setting>
        <!--  / Мин длина  -->
        <!--  Макс длина  -->
        <admin-block-setting
          v-if="initBlock.format === 'input'"
          label="Макс. длина"
          help="Сколько максимально сивмолов можно ввести в это поле. Установите '0', чтобы убрать ограничение."
        >
          <flex-input
            v-model="length.max"
            type="number"
            placeholder="0"
            suffix="символов"
            classes="spy"
          ></flex-input>
        </admin-block-setting>
        <!--  / Макс длина  -->
        <!--  Мин число  -->
        <admin-block-setting
          v-if="initBlock.format === 'number'"
          label="Мин. число"
          help="Минимальное число, которое можно установить в это поле. Или установите '0', чтобы убрать ограничеие"
        >
          <b-form-input v-model="range.min" type="number" placeholder="0" class="spy"></b-form-input>
        </admin-block-setting>
        <!--  / Мин число  -->
        <!--  Макс число  -->
        <admin-block-setting
          v-if="initBlock.format === 'number'"
          label="Макс. число"
          help="Максимальное число, которое можно установить в это поле. Или установите '0', чтобы убрать ограничеие"
        >
          <b-form-input v-model="range.max" type="number" placeholder="0" class="spy"></b-form-input>
        </admin-block-setting>
        <!--  / Макс число  -->
        <h6 class="mt-4">Вид поля в посте</h6>
        <!--  Префикс  -->
        <admin-block-setting label="Префикс" help="Префикс">
          <b-form-select v-model="prefix.position" :options="prefixPositions" class="spy"></b-form-select>
        </admin-block-setting>
        <!--  / Префикс  -->
        <!--  Текст префикса  -->
        <admin-block-setting
          v-if="prefix.position != 'hidden'"
          label="Текст префикса"
          help="Текст префикса"
        >
          <b-form-input v-model="prefix.text" placeholder="Равен названию поля" class="spy"></b-form-input>
        </admin-block-setting>
        <!--  / Текст префикса  -->
        <!--  Отступ снизу  -->
        <admin-block-setting
          label="Отступ снизу"
          help="Требуется ли добавить отступ снизу, чтобы визуально отделить это поле от последующих полей в тексте поста"
        >
          <b-form-checkbox :id="initBlock.id+'-offset'" v-model="offset" switch></b-form-checkbox>
        </admin-block-setting>
        <!--  / Отступ снизу  -->
      </b-collapse>
      <div style="margin:1rem -1.25rem -1.25rem;">
        <button
          class="btn btn-block btn-light mt-2 no-shadow"
          v-b-toggle="initBlock.id+'-hidden-fields'"
        >
          <small class="show-more">
            <i class="fas fa-chevron-down mr-1 fa-color"></i> Больше
          </small>
          <small class="show-less">
            <i class="fas fa-chevron-up mr-1 fa-color"></i> Меньше
          </small>
        </button>
      </div>
    </div>
  </admin-block-card>
</template>


<script>
//import { mapGetters, mapActions } from "vuex";
import AdminBlockCard from "../elements/AdminBlockCard.vue";
import AdminBlockSetting from "../elements/AdminBlockSetting.vue";
import FlexInput from "../../../../elements/FlexInput.vue";

export default {
  components: {
    AdminBlockCard,
    AdminBlockSetting,
    FlexInput
  },
  props: {
    initBlock: {
      type: Object,
      required: true
    }
  },
  computed: {
    // ------ Title -------
    title: {
      get() {
        return this.initBlock.title;
      },
      set(value) {
        this.updateBlock("title", value);
      }
    },
    // ------ Format -------
    format: {
      get() {
        return this.initBlock.format;
      },
      set(value) {
        this.updateBlock("format", value);
      }
    },
    // ------ Required -------
    required: {
      get() {
        return this.initBlock.required;
      },
      set(value) {
        this.updateBlock("required", value);
      }
    },
    // ------ Hint -------
    hint: {
      get() {
        return this.initBlock.hint;
      },
      set(value) {
        this.updateBlock("hint", value);
      }
    },
    // ------ Placeholder -------
    placeholder: {
      get() {
        return this.initBlock.placeholder;
      },
      set(value) {
        this.updateBlock("placeholder", value);
      }
    },
    // ------ Prefix -------
    prefix: {
      get() {
        return this.initBlock.prefix;
      },
      set(value) {
        this.updateBlock("prefix", value);
      }
    },
    // ------ Length -------
    length: {
      get() {
        return this.initBlock.length;
      },
      set(value) {
        this.updateBlock("length", value);
      }
    },
    // ------ Range -------
    range: {
      get() {
        return this.initBlock.range;
      },
      set(value) {
        this.updateBlock("range", value);
      }
    },
    // ------ Offset -------
    offset: {
      get() {
        return this.initBlock.offset;
      },
      set(value) {
        this.updateBlock("offset", value);
      }
    }
  },
  data: function() {
    return {
      expanded: false,
      expandedMore: false,
      prefixPositions: [
        { value: "above", text: "Показать над значением" },
        { value: "start", text: "Показать в начале строки" },
        { value: "hidden", text: "Скрыть" }
      ],
      formats: [
        { value: "textarea", text: "Многострочный текст" },
        { value: "input", text: "Однострочный текст" },
        { value: "number", text: "Число" },
        {
          value: "email",
          text: "Email (доступно только для Pro)",
          disabled: true
        },
        {
          value: "phone",
          text: "Телефон (доступно только для Pro)",
          disabled: true
        },
        {
          value: "mask",
          text: "Маска (доступно только для Pro)",
          disabled: true
        },
        {
          value: "regexp",
          text: "RegExp (доступно только для Pro)",
          disabled: true
        }
      ]
    };
  },
  created: function() {},
  methods: {
    applyFirstCreationConfig(blockId) {
      if (blockId === this.initBlock.id) {
        this.expanded = true;
      }
    },
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
.block__header {
  display: flex;
  justify-content: space-between;
  margin: -0.75rem -1.25rem;
  padding: 0.75rem 1.25rem;
  background: #f8f9fa;
  transition: background 0.2s;
  cursor: pointer;
  border-radius: calc(0.25rem - 1px);
}
.block__header:hover {
  background: #e1e5eb;
}
.block__drag {
  padding-right: 6px;
  opacity: 0.2;
  cursor: move;
}
.shyTextareaHeight {
  height: calc(1.5em + 0.75rem + 2px) !important;
}
</style>