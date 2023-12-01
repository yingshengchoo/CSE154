"use strict";

/**
 * Vincent Choo
 * Date: 01.25.2022
 * Section: CSE 154 AB
 * This is javascript for the index.html. It includes event listeners that
 * call functions when buttons are perss. These elements include showing
 * hidden elements, generating random numbers, and altering the html page.
 */

(function() {

  window.addEventListener("load", init);

  /**
   * adds interactions to button from the html when they are clicked by calling
   * other function.
   */
  function init() {
    let button1 = id("button1");
    let button2 = id("button2");
    let button3 = id("button3");
    let button4 = id("button4");
    button1.addEventListener("click", showStepTwo);
    button2.addEventListener("click", generateCNN);
    button3.addEventListener("click", showStepThree);
    button4.addEventListener("click", suprise);
  }

  /**
   * returns the element from the html which contaitns the ID tag.
   * @param {id} id - the name of the id tag of the element you want.
   * @return {HTMLElement} returns the html tag that contains the ID.
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * learned to check for input before running rest of the function from here:
   * https://stackoverflow.com/questions/30876218/how-to-make-an-input-field-required-before-being-able-to-click-a-input-button-ra
   *
   * Shows step two when all input fields are filled when the button is pressed.
   */
  function showStepTwo() {
    if ((id("name").value && id("date").value && id("address")) !== "") {
      let stepTwo = id("step-two");
      stepTwo.classList.remove("hide");
    }
  }

  /**
   * Shows step three when the user has submited a credit card number
   * that is not the same as the defualt value.
   */
  function showStepThree() {
    if (id("cnn").value !== "0000-0000-0000-0000") {
      let stepThree = id('step-three');
      stepThree.classList.remove('hide');
    }
  }

  /**
   * learned to add leading zeros from here:
   * https://www.codegrepper.com/code-examples/javascript/javascript+add+leading+zeros
   *
   * generates random credit card number and puts that number in the input field
   * when the generate button is pressed. The format of the number is similar to that
   * of a typical credit card number
   */
  function generateCNN() {
    const x = -4;
    const y = 10000;
    const str = '0000';
    let randCNN1 = (str + Math.floor(Math.random() * y)).slice(x);
    let randCNN2 = (str + Math.floor(Math.random() * y)).slice(x);
    let randCNN3 = (str + Math.floor(Math.random() * y)).slice(x);
    let randCNN4 = (str + Math.floor(Math.random() * y)).slice(x);
    let input = id("cnn");
    input.value = randCNN1 + '-' + randCNN2 + '-' + randCNN3 + '-' + randCNN4;
  }

  /**
   * deletes all element within the body of the html. Sets background to black and
   * adds a gif of the spanish inquisition at the middle.
   */
  function suprise() {
    while (document.body.hasChildNodes()) {
      document.body.firstChild.remove();
    }
    let section = document.createElement("section");
    document.body.classList.add("background");
    let img = document.createElement("img");
    img.src = "img/spanish.gif";
    img.alt = "Spanish Inquisition Meme";
    section.appendChild(img);
    document.body.appendChild(section);
  }
})();