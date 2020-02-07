<template>
  <div class="suggest-form">
    <header v-if="isVkGroupAdmin" class="mb-3">
      <b-form-checkbox
        v-model="mode"
        value="admin"
        unchecked-value="publ"
        name="mode-button"
        switch
      >Редактировать форму</b-form-checkbox>
    </header>

    <div @click="dbtest">Fetch</div>

    <admin-blocks v-if="mode=='admin'"/>
    <publ-blocks v-if="mode=='publ'"/>
  </div>
</template>



<script>
import fetch from 'isomorphic-unfetch'
import { mapActions, mapGetters } from "vuex";
import AdminBlocks from "./admin/blocks/AdminBlocks.vue";
import PublBlocks from "./publ/blocks/PublBlocks.vue";

export default {
  components: {
    AdminBlocks,
    PublBlocks
  },

  computed: mapGetters(["vkGroupId", "isVkGroupAdmin"]),

  methods: {
    ...mapActions(["fetchBlocks"])
  },

  data: function() {
    return {
      mode: "admin"
    };
  },
  mounted() {
    this.fetchBlocks();
  },
  methods: {
    dbtest: async ({ req, query }) => {
      const protocol = req
        ? `${req.headers['x-forwarded-proto']}:`
        : location.protocol
      const host = req ? req.headers['x-forwarded-host'] : location.host
      const pageRequest = `${protocol}//${host}/api/profiles?page=${query.page ||
        1}&limit=${query.limit || 9}`
      const res = await fetch(pageRequest)
      const json = await res.json();
      console.log(json);
      return json;
    }
  }
};
</script>