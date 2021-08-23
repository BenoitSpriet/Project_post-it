<template>
  <div class="home">
    <div id="notes">
      <Note v-for="(note, index) in notes" :index="index" :key="note._id" :note="note" />
    </div>
    <div id="footer">
      <Footer @goTo="changePage" />
    </div>
  </div>
</template>

<script>
import Note from "@/components/Note.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    Note,
    Footer,
  },
  data() {
    return {
      offset: 0,
      // page: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getNotes");
  },
  computed: {
    notes() {
      return this.$store.getters.getFilteredNotes(this.offset);
    },
  },
  methods: {
    changePage(page) {
      this.offset = page * 5 - 5;
    },
  },
};
</script>

<style lang="scss">
#notes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
}

button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  background-color: rgb(255, 255, 255, 0.1);
  color: rgb(255, 255, 255, 0.5);

  padding: 0.2rem 1rem;
  margin-right: 0.1rem;
  font-size: 3rem;
  border-radius: 1rem;
}
</style>
