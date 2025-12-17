// dropdown menu //

function myFunction() {
  const dropdown = document.getElementById("myDropdown");
  const navButton = document.querySelector(".nav-button");

  dropdown.classList.toggle("show");

  
  const isOpen = dropdown.classList.contains("show");
  navButton.setAttribute("aria-expanded", isOpen);
}


document.addEventListener("click", function (event) {
  const dropdown = document.getElementById("myDropdown");
  const navButton = document.querySelector(".nav-button");

  const clickedButton = event.target.closest(".nav-button");
  const clickedInsideMenu = event.target.closest("#myDropdown");

  if (!clickedButton && !clickedInsideMenu) {
    dropdown.classList.remove("show");
    navButton.setAttribute("aria-expanded", "false");
  }
});


document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const dropdown = document.getElementById("myDropdown");
    const navButton = document.querySelector(".nav-button");

    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
      navButton.setAttribute("aria-expanded", "false");
      navButton.focus();
    }
  }
});


document.getElementById("closeMenuBtn").addEventListener("click", () => {
  const dropdown = document.getElementById("myDropdown");
  const navButton = document.querySelector(".nav-button");

  dropdown.classList.remove("show");
  navButton.setAttribute("aria-expanded", "false");
  navButton.focus();
});


// basket //

let count = 0;

const buttons = document.querySelectorAll(".producebtn");
const basketCount = document.getElementById("basketcount");


basketCount.setAttribute("aria-live", "polite");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    count++;
    basketCount.textContent = count;
  });
});


// FORM //

document.getElementById("newsletterform").addEventListener("submit", function (event) {
  let isValid = true;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");

  nameError.textContent = "";
  emailError.textContent = "";


  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  }


  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
});