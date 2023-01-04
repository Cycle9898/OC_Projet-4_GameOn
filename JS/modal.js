// DOM Elements

const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");

// Change class name (restyle) on burger menu (mobile)

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Launch modal event

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form

function launchModal() {
  modalBg.style.display = "block";
}

// Function to clear form fields

function clearForm(id) {
  document.getElementById(id).reset();
}

// Function to clear form and close modal with an animation

function closeModal() {
  clearForm("modal-form");
  modalBg.style.animation = "modalopen var(--modal-duration) reverse";
  setTimeout(() => { modalBg.style.animation = "" }, 800);
  setTimeout(() => { modalBg.style.display = "none" }, 800);
}

// Close modal event

closeModalBtn.addEventListener("click", closeModal);