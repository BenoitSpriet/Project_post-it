import { createStore } from "vuex";

export default createStore({
  state: {
    notes: [],
    note: {},
    message: "",
    error: false,
  },
  getters: {
    getFilteredNotes: (state) => (offset) => {
      return state.notes.slice(offset, offset + 5);
    },
    getNotesLength: (state) => {
      return state.notes.length;
    },
  },
  mutations: {
    SET_Notes(state, notes) {
      state.notes = notes;
    },
    SET_Note(state, note) {
      state.note = note;
    },
    DELETE_Note(state, id) {
      let index = state.notes.findIndex((note) => note._id == id);
      state.notes.splice(index, 1);
    },
    ERROR(state, message) {
      state.message = message;
      state.error = true;
    },
    RESET_Error(state) {
      state.error = false;
      state.message = "";
    },
  },
  actions: {
    getNotes({ commit }) {
      fetch(`${process.env.VUE_APP_ENDPOINT}/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              commit("SET_Notes", data.notes);
            });
          } else {
            throw new Error("sorry seems like we have a problem");
          }
        })
        .catch((error) => {
          commit("ERROR", error.message);
        });
    },
    deleteNote({ dispatch }, id) {
      if (confirm("You are about to delete this note! Do you want to proceed?")) {
        fetch(`${process.env.VUE_APP_ENDPOINT}/notes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              response.json().then(() => {
                dispatch("getNotes");
              });
            } else if (response.status == 400 || response.status == 404) {
              response.json().then((data) => {
                if (confirm(`Error: ${data.error.message}. Do you want to try again?`)) {
                  dispatch("deleteNote");
                } else {
                  this.$router.push("/");
                }
              });
            } else {
              throw new Error("sorry seems like we have a problem");
            }
          })
          .catch((error) => {
            if (confirm(`Error: ${error.message}. Do you want to try again?`)) {
              dispatch("deleteNote");
            } else {
              this.$router.push("/");
            }
          });
      }
    },
  },
  modules: {},
});
