<template>
  <div class="note">
    <div class="header">
      <div class="title">
        <h2 v-if="editTitle == false">
          <button @click="editTitle = true"><img src="@/assets/edit_white_24dp.svg" alt="Edit title" /></button>
          {{ title }}
        </h2>
        <h2 v-if="editTitle == true">
          <input class="title" type="text" name="title" id="title" v-model="newTitle" placeholder="Title" />
          <button @click="confirm_edit_title()"><img src="@/assets/done_white_24dp.svg" alt="Confirm" /></button>
          <button @click="annul_edit_title()"><img src="@/assets/cancel_white_24dp.svg" alt="Annul" /></button>
        </h2>
      </div>
      <div class="button">
        <button @click="confirm_edit()"><img src="@/assets/done_white_24dp.svg" alt="Save Change" /></button>
        <button @click="delete_this_note()"><img src="@/assets/delete_white_24dp.svg" alt="Delete" /></button>
      </div>
    </div>
    <div class="content" v-for="(step, index) of steps" :key="index">
      <p>Step {{ index + 1 }}</p>
      <div class="task" v-if="step.edit == false">
        <p>{{ step.input }}</p>
        <div class="buttons">
          <button><img src="@/assets/edit_white_24dp.svg" alt="Edit" @click="step.edit = true" /></button>
          <button><img src="@/assets/delete_white_24dp.svg" alt="Delete" @click="delete_step(index)" /></button>
        </div>
      </div>
      <div class="task" v-if="step.edit == true">
        <input v-model="step.newInput" type="text" name="step" id="step" placeholder="Step" />
        <div class="buttons">
          <button @click="confirm_edit_step(index)"><img src="@/assets/done_white_24dp.svg" alt="Edit" /></button>
          <button @click="annul_edit_step(index)"><img src="@/assets/cancel_white_24dp.svg" alt="Annul" @click="step.edit = false" /></button>
        </div>
      </div>
    </div>
    <div class="add-step">
      <button @click="steps.push({ input: '', newInput: '', edit: true })">
        <img src="@/assets/add_circle_outline_white_24dp.svg" alt="Create New Step" />
      </button>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
export default {
  name: "NoteDetail",
  data() {
    return {
      editTitle: false,
      id: this.$route.params.id,
      steps: [
        {
          input: "",
          newInput: "",
          edit: false,
        },
      ],
      newTitle: "",
      title: "",
    };
  },
  mounted() {
    let id = this.$route.params.id;
    fetch(`${process.env.VUE_APP_ENDPOINT}/notes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            this.title = data.note.title;
            for (let i = 0; i < data.note.content.length; i++) {
              if (i == 0) {
                this.steps[0].input = data.note.content[i];
              } else {
                let contentval = data.note.content[i];
                this.steps.push({ input: contentval, edit: false });
              }
            }
          });
        } else if (response.status == 400 || response.status == 404) {
          response.json().then((data) => {
            alert(data.error.message);
            this.$router.push("/");
          });
        } else {
          throw new Error("sorry seems like we have a problem");
        }
      })
      .catch((error) => {
        alert(error.message);
        this.$router.push("/");
      });
  },
  methods: {
    confirm_edit_title() {
      this.title = this.newTitle;
      this.editTitle = false;
      this.newTitle = "";
    },
    annul_edit_title() {
      this.editTitle = false;
      this.newTitle = "";
    },
    confirm_edit_step(index) {
      this.steps[index].input = this.steps[index].newInput;
      this.steps[index].edit = false;
      this.steps[index].newInput = "";
    },
    annul_edit_step(index) {
      this.steps[index].edit = false;
      this.steps[index].newInput = "";
    },
    delete_step(index) {
      this.steps.splice(index, 1);

      if (this.steps.length == 0) {
        this.steps.push({ input: "", newInput: "", edit: false });
      }
    },
    confirm_edit() {
      if (this.title === null || this.title === "") {
        alert("your Note must have a title! Please enter a title!");
      } else {
        if (confirm("Do you want to Save your change?")) {
          let content = [];

          for (let i = 0; i < this.steps.length; i++) {
            content.push(this.steps[i].input);
          }

          fetch(`${process.env.VUE_APP_ENDPOINT}/notes/${this.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: this.title,
              content: content,
            }),
          })
            .then((response) => {
              if (response.status == 200) {
                alert("Your Note has been edited with Success");
                this.$router.push("/");
              } else if (response.status == 400 || response.status == 404) {
                response.json().then((data) => {
                  if (confirm(`Error: ${data.error.message}. Do you want to try again?`)) {
                    this.confirm_edit();
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
                this.confirm_edit();
              } else {
                this.$router.push("/");
              }
            });
        }
      }
    },
    delete_this_note() {
      this.$store.dispatch("deleteNote", this.id);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.note {
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgb(255, 255, 255, 0.3);
  position: relative;
  display: block;
  margin: 2.5rem 20%;
}

.header {
  display: flex;
  justify-content: space-between;
  margin: -0.5rem 0.5rem;
  padding: 1rem 0;
}

.header img {
  width: 2rem;
}

input {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-family: "Indie Flower", cursive;
}

.title {
  text-transform: uppercase;
  margin: auto;
  margin-left: 0rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 0, 0.4);
  color: rgba(0, 0, 0, 1);
  font-family: "Indie Flower", cursive;

  font-size: 2rem;
}

.task {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: -0.5rem;
  font-family: "Indie Flower", cursive;

  background-color: rgb(255, 255, 255, 0.5);
  box-shadow: 5px 5px 5px rgb(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  margin: 1rem 0;
  color: black;
}

.task input {
  width: 100%;
  color: black;
}

.task:hover img {
  // display: flex;
  visibility: visible;
  transform: translateX(0rem);
}

.task img {
  width: 0.8rem;
}

.task p {
  padding: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  margin: auto;
  margin-left: 0;
  margin-bottom: -0.5rem;
  font-family: "Indie Flower", cursive;
}

.buttonadddel img {
  width: 2.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.25s;
}

.buttonadddel img:hover {
  background-color: rgba(255, 0, 0, 0.4);
}

// .button {
//   display: flex;
//   gap: 1rem;
// }

.content,
.add-content {
  background-color: rgb(255, 255, 255, 0.5);
  padding: 1rem;
  margin: 1rem 0;
  // display: flex;
  // justify-content: space-between;
}

.content p,
.add-content p {
  color: black;
}

.content:hover img {
  visibility: visible;
}

.buttons {
  visibility: hidden;
}

button {
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: rgb(255, 255, 255, 0.5);

  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  border-radius: 1rem;
  color: rgb(0, 0, 0, 0.7);
}

.footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
  position: sticky;
  top: 100%;
}

.buttons img:hover {
  // border: 3px solid rgba(255, 255, 0, 0.4);
  background-color: rgba(255, 255, 0, 0.4);
}

.buttons img {
  width: 1.5rem;
  // padding: 0 0.5rem;
  padding: 1rem 1em 1rem 1rem;
  margin: 0 0 -0.3rem 0;
  // display:none;
  visibility: hidden;
  transform: translateX(5rem);
  background-color: rgb(0, 0, 0, 0.1);
  border: 3px solid rgb(0, 0, 0, 0);
  transition: 0.5s;
  cursor: pointer;
}

.add-content2 img {
  width: 2.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.25s;
}

.add-content2 img:hover {
  background-color: rgba(0, 255, 0, 0.4);
}
</style>
