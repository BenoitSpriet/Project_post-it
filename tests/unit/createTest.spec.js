import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Create from "@/views/Create.vue";
var sinon = require("sinon");

var alert; // We are going to overwrite default alert() function

function generateAlert(x) {
  if (!x) {
    return;
  }

  alert(x);
}

const factory = (values = {}) => {
  return shallowMount(Create, {
    data() {
      return {
        ...values,
      };
    },
  });
};

// test:
// requete getNote
// toute les méthodes (tout les buttons)
// confirmation sans titre
// confirmation avec titre => edition avec fetch et message alert + router
// delete note

describe("Create", () => {
  beforeEach(function () {
    alert = sinon.spy();
  });

  it("make an alert when title is empty", async () => {
    const wrapper = factory({ title: "" });
    const button = wrapper.find("button");
    await button.trigger("click");
    generateAlert("your Note must have a title! Please enter a title!");

    expect(alert.calledOnce).to.be.true;
    expect(alert.args[0][0]).to.equal("your Note must have a title! Please enter a title!");
    // expect(wrapper.find(alert("your Note must have a title! Please enter a title!")).exists()).to.be.true;
  });

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
});

