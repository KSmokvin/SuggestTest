<template>
  <div class="header-navbar bg-primary">
    <div class="container">
      <div class="row">
        <div class="col px-0">
          <b-navbar toggleable="sm" type="dark" variant="primary">
            <b-navbar-brand href="#" @click="$emit('route', 'home')">Suggest</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item
                  href="#"
                  @click="$emit('route', 'form')"
                  :class="{ active: $parent.page=='form' }"
                >
                  <template v-if="isVkGroupAdmin">Форма</template>
                  <template v-else>Предложить новость</template>
                </b-nav-item>
                <!-- <b-nav-item
                  href="#"
                  @click="$emit('route', 'settings')"
                  :class="{ active: $parent.page=='settings' }"
                >Настройки</b-nav-item>-->
                <b-nav-item
                  href="#"
                  @click="$emit('route', 'premium')"
                  :class="{ active: $parent.page=='premium' }"
                >Премиум</b-nav-item>
                <b-button
                  v-if="vkGroupId"
                  size="sm"
                  class="ml-3 py-1 my-1 d-flex align-items-center"
                  :href="'https://vk.com/club'+vkGroupId"
                  target="_blank"
                  type="button"
                  variant="outline-light"
                >
                  вернуться
                  <i class="fas fa-undo-alt ml-2"></i>
                </b-button>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    vkGroupId: function() {
      return this.$store.getters.vkGroupId;
    },
    isVkGroupAdmin: function() {
      return this.$store.getters.isVkGroupAdmin;
    }
  }
};
</script>