export default {
  generateId: function(prefix = "") {
    return (
      prefix +
      String(Math.floor(Date.now() / 1000)).substr(1) +
      this.random(10000, 99999)
    );
  },

  random: function(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  },

  console: function(obj1, obj2 = "#not_set") {
    if (obj2 === "#not_set") console.log(obj1);
    else console.log(obj1, obj2);
  },

  getQueryParams: function() {
    var search = window.location.search.substring(1);
    return !search
      ? {}
      : JSON.parse(
          '{"' +
            decodeURI(search)
              .replace(/"/g, '\\"')
              .replace(/&/g, '","')
              .replace(/=/g, '":"') +
            '"}'
        );
  }
};
