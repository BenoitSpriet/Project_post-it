<template>
  <form id="note" @submit="CreateNote" @submit.prevent="onSubmit">
    <div class="header">
      <input class="title" type="text" name="title" id="title" placeholder="Title" v-model="title" />
      <div class="buttonadddel">
        <button type="submit">+</button>
      </div>
    </div>
    <div class="content" v-for="(step, index) of steps" :key="index">
      <p>Step {{ index + 1 }}</p>
      <div class="task">
        <input v-model="step.input" type="text" name="step" id="step" placeholder="Step" />
        <div class="remove-step">
          <img src="@/assets/cancel_white_24dp.svg" alt="Annul" v-if="steps.length > 1" @click="steps.splice(index, 1)" />
        </div>
      </div>
    </div>
    <div class="add-step">
      <img src="@/assets/add_circle_outline_white_24dp.svg" alt="Add Step" @click="steps.push({ input: '' })" />
    </div>
  </form>
</template>

<script>
export default {
  name: "Create",
  data() {
    return {
      title: "",
      steps: [
        {
          input: "",
        },
      ],
    };
  },
  methods: {
    test(index) {
      console.log(index);
    },
    CreateNote() {
      if (this.title === null || this.title === "") {
        alert("your Note must have a title! Please enter a title!");
      } else {
        if (confirm("You are about to create a new Note. Do you want to proceed")) {
          let content = [];

          for (let i = 0; i < this.steps.length; i++) {
            content.push(this.steps[i].input);
          }

          fetch(`${process.env.VUE_APP_ENDPOINT}/notes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: this.title,
              content: content,
            }),
          })
            .then((response) => {
              if (response.status == 201) {
                alert("Your Note has been created with Success");
                this.$router.push("/");
              } else if (response.status == 400 || response.status == 500) {
                response.json().then((data) => {
                  if (confirm(`Error: ${data.error.message}. Do you want to try again?`)) {
                    this.CreateNote();
                  } else {
                    this.$router.push("/");
                  }
                });
              } else {
                throw new Error("Sorry seems like we have a problem");
              }
            })
            .catch((error) => {
              if (confirm(`Error: ${error.message}. Do you want to try again?`)) {
                this.CreateNote();
              } else {
                this.$router.push("/");
              }
            });
        }
      }
    },
  },
};
</script>

<style lang="scss">
#error {
  margin-top: 20rem;
  margin-left: 30rem;
  width: 50%;
  height: 10rem;
  display: flex;
  justify-content: center;
  flex-direction: row;

  background-color: rgb(255, 255, 255, 0.3);
}

#error p {
  margin-top: 4rem;
  color: red;
  font-size: 1.5rem;
}

#note {
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

input {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-family: "Indie Flower", cursive;
  // width: 100%;
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
}

.task input {
  width: 100%;
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

.content {
  margin: 1rem 0.5rem;
}

.task {
  background-color: rgb(255, 255, 255, 0.5);
  box-shadow: 5px 5px 5px rgb(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  margin: 1rem 0;
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

.add-step img {
  width: 2.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.25s;
}

.add-step img:hover {
  background-color: rgba(0, 255, 0, 0.4);
}

.remove-step img {
  width: 2.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: 0.25s;
}

.remove-step img:hover {
  background-color: rgba(240, 6, 6, 0.822);
}
</style>
