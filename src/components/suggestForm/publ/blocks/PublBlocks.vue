<template>
  <div class="blocks blocks-publ">
    <template v-if="allBlocks.length">
      <form @submit.prevent="wallPost()">
        <component
          v-for="block in allBlocks"
          :is="defineComponent(block.type)"
          :key="block.id"
          :init-block="block"
          ref="block"
        />
        <button type="submit" class="btn btn-block btn-success p-2 mt-4">
          <template v-if="isVkGroupAdmin">Опубликовать пост</template>
          <template v-else>Предложить пост</template>
        </button>
      </form>
    </template>

    <template v-else>
      <b-card class="px-5 py-5 text-center">
        <b-card-text v-if="isVkGroupAdmin">
          <p>Приложение успешно установлено в сообщество
            <template v-if="vkGroup.name">«{{vkGroup.name}}»</template>
          </p>
          <p class="mb-0">
            Перейдите в
            <a href="#" @click.prevent="$parent.mode='admin'" title>режим редактирования</a>, добавьте нужные поля, а затем возвращайтесь в режим просмотра, чтобы увидеть форму.
          </p>
        </b-card-text>
        <b-card-text v-else>
          <p>Это приложение позволяет принимать предложенные новости для сообщества
            <template v-if="vkGroup.name">
              «
              <a :href="'https://vk.com/club'+vkGroupId" target="_blank">{{vkGroup.name}}</a>»
            </template>- но форма пока ещё не настроена...
          </p>
          <p
            class="mb-0"
          >Пожалуйста, вернитесь через некоторое время или свяжитесь с администратором сообщества, чтобы обратить его внимание на то, что форма не готова к работе.</p>
        </b-card-text>
      </b-card>
    </template>

    <b-card v-if="allBlocks.length" no-body class="mt-2">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block href="#" v-b-toggle.post-preview variant="light" class="p-2 no-shadow">
          <small>
            <i class="fas fa-eye fa-lg mr-1 fa-color"></i> Предпросмотр
          </small>
        </b-button>
      </b-card-header>
      <b-collapse id="post-preview" role="tabpanel" class=" px-3">
        <b-card-body>
          <div class="post-preview__header d-flex align-items-center mt-2 mb-3">
            <img :src="vkGroup.photo_50" alt="Group photo" class="rounded-circle mr-2">
            <div>
              <div>
                <a
                  :href="'http://vk.com/club'+vkGroup.id"
                  target="_blank"
                  class="bold"
                  rel="noopener noreferrer"
                >{{vkGroup.name}}</a>
              </div>
              <div class="text-muted small">Автор: {{vkUser.first_name}} {{vkUser.last_name}}</div>
            </div>
          </div>
          <div class="post-preview__body" style="white-space:pre; font-size:15px;">{{postText}}</div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import PublInputBlock from "./types/PublInputBlock.vue";

export default {
  components: {
    PublInputBlock
  },
  props: {
    initialBlocks: {
      type: Array
    }
  },
  computed: mapGetters([
    "allBlocks",
    "postText",
    "vkUser",
    "vkGroup",
    "vkGroupId",
    "isVkGroupAdmin"
  ]),
  data: function() {
    return {};
  },
  created() {},
  methods: {
    defineComponent(blockType) {
      const componentNames = {
        input: "PublInputBlock",
        checkboxes: "PublCheckboxesBlock",
        radios: "PublRadiosBlock"
      };
      return componentNames[blockType];
    },
    wallPost() {
      this.$store.dispatch("vkWallPost", { message: this.postText });
    }
  }
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";
.block-publ__header {
  display: flex;
  margin-bottom: 0.35rem;
  font-size: 14px;
  line-height: 18px;
}
.block-publ__title {
  color: $textInfo;
}
.block-publ__hint {
  margin: 0.35rem 0;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  color: $textInfo;
  font-size: 80%;
  background: #e1e5eb;
  white-space: pre;
}
.block-publ__hint-toggler {
  margin: 1px 6px 1px 1px;
  font-size: 16px;
}
</style>
