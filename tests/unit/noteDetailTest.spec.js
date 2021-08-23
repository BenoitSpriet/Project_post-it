// import { expect } from "chai";
// import { shallowMount } from "@vue/test-utils";
// import NoteDetail from "@/views/NoteDetail.vue";

// const factory = (values = {}) => {
//   return shallowMount(NoteDetail, {
//     data() {
//       return {
//         ...values,
//       };
//     },
//   });
// };

// // test:
// // requete getNote
// // toute les méthodes (tout les buttons)
// // confirmation sans titre
// // confirmation avec titre => edition avec fetch et message alert + router
// // delete note

// describe("NoteDetail.vue", () => {
//     it("change title", async () => {
//         const wrapper = factory({ title: "Test", newTitle: "BenTest" });
//         const button = wrapper.findAll("button")[2];
//         const title = wrapper.find("h2");
//         expect(title.text()).to.equal('Test');
//         await button.trigger("click");
//         expect(title.text()).to.equal("BenTest");
//       });
// });

// describe("NoteDetail.vue", () => {
//   beforeEach(() => {
//     wrapper = factory({
//       editTitle: false,
//       id: this.$route.params.id,
//       steps: [
//         {
//           input: "",
//           newInput: "",
//           edit: false,
//         },
//       ],
//       newTitle: "",
//       title: "",
//     });
//   });
//   afterEach(() => {
//     wrapper.destroy();
//   });
//   it("change the title value", async () => {
//     wrapper.setData({ title: "" }), expect(wrapper.find(alert("your Note must have a title! Please enter a title!")).exists()).toBe(true);
//   });
// });

// describe("Foo", () => {
//   it("restitue un message de bienvenue", () => {
//     const wrapper = factory();

//     expect(wrapper.find(".message").text()).toEqual("Bienvenue sur le tutoriel Vue.js");
//   });

//   it("restitue une erreur quand `username` a moins de 7 caractères", () => {
//     const wrapper = factory({ username: "" });

//     expect(wrapper.find(".error").exists()).toBeTruthy();
//   });

//   it("restitue une erreur quand `username` contient des espaces", () => {
//     const wrapper = factory({ username: " ".repeat(7) });

//     expect(wrapper.find(".error").exists()).toBeTruthy();
//   });

//   it("ne restitue pas d'erreur quand `username` a 7 caractères ou plus", () => {
//     const wrapper = factory({ username: "Lachlan" });

//     expect(wrapper.find(".error").exists()).toBeFalsy();
//   });
// });
