"use strict";

/**
 * Vincent Choo
 * Date: 01.25.2022
 * Section: CSE 154 AB
 *
 * This is javscript for index.html. It add interactions to the webpage when
 * buttons are pressed showing and hidding elements on the page, generating random
 * users. There is also a timer.
 */

(function() {

  // documentation: https://randomuser.me/
  const URL = 'https://randomuser.me/api/';
  const DELAY = 1000;
  const MIN = 60;
  let count = 0;
  let remainingSeconds = 0;
  let timerId = null;

  window.addEventListener("load", init);

  /**
   * add functionality to buttons on the webpage.
   */
  function init() {
    let button1 = id("button1");
    let button2 = id("button2");
    let button3 = id("button3");
    let button4 = id("button4");
    let button5 = id("button5");
    button1.addEventListener("click", toggleViewsOne);
    button2.addEventListener("click", beginGame);
    button3.addEventListener("click", clickNo);
    button4.addEventListener("click", clickYes);
    button5.addEventListener("click", toggleViewsTwo);
  }

  /**
   * hides the user-info input section and shows the game section. Starts a timer
   * starting at 3 min whic decreases every second. Also generates a random user to
   * to start the matching process.
   */
  function beginGame() {
    count = 0;
    let game = id("game-view");
    let info = id("user-info");
    let time = id("time");
    fetchUser();
    game.classList.remove("hidden");
    info.classList.add("hidden");
    remainingSeconds = 180;
    time.textContent = "03:00";
    timerId = setInterval(advanceTimer, DELAY);
  }

  /**
   * Advances the timer every second. When the time reaches 0 seconds. stop the timer
   * and show the results.
   */
  function advanceTimer() {
    remainingSeconds--;
    let time = id("time");
    let seconds = ("00" + remainingSeconds % MIN).slice(-2);
    time.textContent = "0" + Math.floor(remainingSeconds / MIN) + ":" + seconds;
    if (remainingSeconds === 0) {
      clearInterval(timerId);
      timerId = null;
      showResults();
    }
  }

  /**
   * hides the user-info input section and shows the game section. Starts a timer
   * starting at 3 min whic decreases every second. Also generates a random user to
   * to start the matching process.
   */
  function toggleViewsOne() {
    let info = id("user-info");
    let menu = id("menu-view");
    menu.classList.add("hidden");
    info.classList.remove("hidden");
  }

  /**
   * hides the results section and shows the game section. A new game is created.
   */
  function toggleViewsTwo() {
    let results = id("results-view");
    let game = id("game-view");
    game.classList.remove("hidden");
    results.classList.add("hidden");
    beginGame();
  }

  /**
   * Increment Count by 1 and generates a new user and replaces the current one
   * when the 'Yes' button is clicked.
   */
  function clickYes() {
    count++;
    fetchUser();
  }

  /**
   * Generates a new user and replaces the current one when the 'No' button is
   * clicked.
   */
  function clickNo() {
    fetchUser();
  }

  /**
   * Hides the game section, and shows the results section. Dispalys total count.
   */
  function showResults() {
    let totalCount = id("count");
    totalCount.textContent = count;
    let results = id("results-view");
    let game = id("game-view");
    results.classList.remove("hidden");
    game.classList.add("hidden");
  }

  /**
   * fetchs a randomly generated user from https://randomuser.me/. It translates
   * the response to a promise, and then it is generated into a random user which
   * is readable by the user. Errors checked for throughout
   */
  function fetchUser() {
    fetch(URL)
      .then(statusCheck)
      .then(res => res.json())
      .then(processUserJson)
      .catch(handleRequestError);
  }

  /**
   * Displays an error message in the console to indicate that somethign went wrong.
   * when somethign do go wrong.
   */
  function handleRequestError() {
    let profile = id("profile");
    let p1 = document.createElement("p");
    p1.textContent = "Oppsie daisy, something went wrong!";
    profile.appendChild(p1);
  }

  /**
   * converts the response into a html elements which can be easily understood by
   * users.and adds it to the game. returns the promise so the catch statement doesn't
   * run.
   * @param {Promise} response - a fulfilled promise that contains information about
   *                            the generated user
   * @return {Promise}  returns response.
   */
  function processUserJson(response) {
    id("profile").innerHTML = "";
    let div = document.createElement("div");
    let h3 = document.createElement("h3");
    let p4 = document.createElement("p");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let img = document.createElement("img");
    let name = response.results[0].name.first + " " + response.results[0].name.last;
    img.src = response.results[0].picture.large;
    img.alt = name;
    h3.textContent = name;
    p4.textContent = "Age: " + response.results[0].registered.age;
    p1.textContent = "Country: " + response.results[0].location.country;
    p2.textContent = "Email: " + response.results[0].email;
    p3.textConent = "Phone Number: " + response.results[0].phone;
    let profile = id("profile");
    div.classList.add("about");
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p4);
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    profile.appendChild(div);
    return response;
  }

  /**
   * checks to see whether if a response was retrieved or not. If it is not, an
   * error is thrown before the response is converted.
   * @param {Promise} response - a promise that contains information about the generated user
   * @return {Promise}  returns response.
   */
  async function statusCheck(response) {
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return response;
  }

  /**
   * returns the element from the html which contaitns the ID tag.
   * @param {id} id - the name of the id tag of the element you want.
   * @return {HTMLElement} returns the html tag that contains the ID.
   */
  function id(id) {
    return document.getElementById(id);
  }
})();