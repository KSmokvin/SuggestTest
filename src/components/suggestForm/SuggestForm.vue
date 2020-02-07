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
import db  from '../../../lib/db';
import escape from "sql-template-strings";
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
    ...mapActions(["fetchBlocks"]),

    dbtest:  async () => {
      const profiles = await db.query(escape`
          SELECT *
          FROM profiles
        `)
      console.log(profiles)
    }
  },

  data: function() {
    return {
      mode: "admin"
    };
  },
  mounted() {
    this.fetchBlocks();
  }
};
</script>