<template>
  <div>
    <ol id="footer">
      <button id="start" @click="backPage()">Back</button>
      <button id="page" v-for="page in pages" :key="page" @click="goToPage(page)">
        <p v-if="page == start" style="background-color: blue">{{ page }}</p>
        <p v-else>{{ page }}</p>
      </button>
      <button v-if="test">...</button>
      <button id="next" @click="nextPage()">Next</button>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      start: 1,
      test: false,
    };
  },
  computed: {
    count() {
      return this.$store.getters.getNotesLength;
    },
    pages: function () {
      let pages = [];
      let pagesNumber = Math.ceil(this.count / 5);

      if (pagesNumber < 5) {
        for (let i = 1; i <= pagesNumber; i++) {
          pages.push(i);
        }
      } else {
        if (this.start < 5) {
          for (let i = 1; i <= pagesNumber; i++) {
            pages.push(i);
          }
        } else {
          for (let i = this.start; i <= Math.ceil(this.count / 5); i++) {
            pages.push(i);
          }
        }
      }
      return pages;
    },
  },
  methods: {
    backPage() {
      this.start -= 1;
      if (this.start < 1) {
        this.start = 1;
      }
      this.$emit("goTo", this.start);
    },
    goToPage(page) {
      this.$emit("goTo", page);
      this.start = page;
    },
    nextPage() {
      this.start += 1;
      if (this.start > this.pages[this.pages.length - 1]) {
        this.start = this.pages[this.pages.length - 1];
      }
      this.$emit("goTo", this.start);
    },
  },
};
</script>

<style scoped>
#footer {
  display: flex;
  flex-direction: row;
}

#footer button:hover {
  background-color: green;
}
</style>
