const form = document.querySelector("form");
const textArea = form.querySelector("textarea");
const counter = form.querySelector("output")


  textArea.addEventListener("keyup", (function () {
    console.log(textArea.value)
    let characters = 140 - (this.value.length);
    $(counter).html(characters)
    if (characters < 0) {
      $(counter).css("color","red");
    } else {
      $(counter).css("color","black");
    };
  }));





