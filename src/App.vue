<template>
  <div id="app">
    <header-navbar @route="changePage"/>
    <div class="container">
      <div class="row">
        <div class="col py-4">
          <page-home v-if="page=='home'"/>
          <page-premium v-if="page=='premium'"/>
          <suggest-form v-if="page=='form'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SuggestForm from "./components/suggestForm/SuggestForm";
import HeaderNavbar from "./components/pages/pageBlocks/HeaderNavbar";
import PageHome from "./components/pages/PageHome";
import PagePremium from "./components/pages/PagePremium";

export default {
  name: "App",
  components: {
    SuggestForm,
    HeaderNavbar,
    PageHome,
    PagePremium
  },
  data: function() {
    return {
      page: "home"
    };
  },
  created() {
    if (window.name.substr(0, 2) === "fX") this.$store.dispatch("vkInit");
    else this.$store.dispatch("vkInitTest");
  },
  mounted: function() {
    this.onElementHeightChange(document.body, function(height) {
      if (height < 500) height = 500;
      window.VK.callMethod("resizeWindow", 800, height);
    });
  },
  methods: {
    changePage(pageName) {
      this.page = pageName;
    },
    onElementHeightChange(elm, callback) {
      var lastHeight = elm.clientHeight,
        newHeight;
      (function run() {
        newHeight = elm.clientHeight;
        if (lastHeight !== newHeight) callback(newHeight);
        lastHeight = newHeight;
        if (elm.onElementHeightChangeTimer)
          clearTimeout(elm.onElementHeightChangeTimer);
        elm.onElementHeightChangeTimer = setTimeout(run, 500);
      })();
    }
  }
};
</script>




<style lang="scss">
@import "./assets/scss/variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: #fafbfc;
}

body.vkapp {
  overflow-y: hidden;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  font-style: italic;
  font-weight: normal;
}

input.niph::-webkit-input-placeholder {
  font-style: normal;
}
input.lnth::-webkit-input-placeholder {
  text-decoration: line-through;
}
i.fa-color {
  color: $icon;
}
i.fa-color-hover {
  cursor: pointer;
  transition: color 0.1s;
  &:hover,
  &:active,
  &.active {
    color: $iconHover;
  }
}

#app {
  line-height: 1.5;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $vue-blue;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.tooltip {
  font-size: 0.8rem;
  line-height: 125%;
}

.form-control.spy,
.custom-select.spy {
  border-color: transparent;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.form-control.form-control-sm.spy {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.btn .show-more {
  display: none;
}
.btn .show-less {
  display: block;
}
.btn.collapsed .show-more {
  display: block;
}
.btn.collapsed .show-less {
  display: none;
}

.bold {
  font-weight: bold;
}
.nowrap {
  white-space: nowrap;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-60 {
  opacity: 0.6;
}
.opacity-70 {
  opacity: 0.7;
}
.opacity-80 {
  opacity: 0.8;
}
.opacity-90 {
  opacity: 0.9;
}
.opacity-100 {
  opacity: 1;
}

.card-header {
  border-bottom: none;
}

.no-shadow {
  box-shadow: none !important;
}
</style>
