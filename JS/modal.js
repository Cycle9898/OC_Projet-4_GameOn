// DOM Elements

const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector(".close");

const formData = document.querySelectorAll(".formData");

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthDateInput = document.getElementById("birthdate");
const tournamentQuantityInput = document.getElementById("quantity");
const tournamentCheckBoxes = document.querySelectorAll('input[name="location"]');
const termsOfUseCheckBox = document.getElementById("checkbox1");

///////////////////////////////////////////////////////////////////////////////

// Function to change class name (restyle) on burger menu (mobile)

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

///////////////////////////////////////////////////////////////////////////////

// Launch modal event

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Function to set all "data-error" attribute + no visibility

function setErrorMessages() {
  for (let i = 0; i <= 6; i++) {
    const errorMessages = ['Le champ "Prénom" doit contenir au minimum 2 caractères',
      'Le champ "Nom" doit contenir au minimum 2 caractères',
      "Veuillez entrer une adresse email valide",
      "Veuillez entrer une date de naissance valide",
      "Veuillez entrer un nombre compris entre 0 et 99",
      "Veuillez choisir un tournoi",
      "Merci d'accepter les conditions d'utilisation avant de poursuivre"]

    formData[i].setAttribute("data-error", errorMessages[i]);
    formData[i].setAttribute("data-error-visible", "false");
  }
}

// Launch modal form and call setErrorMessages function

function launchModal() {
  modalBg.style.display = "block";
  setErrorMessages();
}

///////////////////////////////////////////////////////////////////////////////

// Function to clear form fields

function clearForm(id) {
  document.getElementById(id).reset();
}

// Function that call clearForm() and close modal with an animation

function closeModal() {
  clearForm("modal-form");
  modalBg.style.animation = "modalopen var(--modal-duration) reverse";
  setTimeout(() => { modalBg.style.animation = "" }, 800);
  setTimeout(() => { modalBg.style.display = "none" }, 800);
}

// Close modal event

closeModalBtn.addEventListener("click", closeModal);

///////////////////////////////////////////////////////////////////////////////

// Function to check validity of "Nom" or "Prénom" input

function checkName(field) {
  if (field.value.length < 2) {
    field.parentNode.setAttribute("data-error-visible", "true");
  } else {
    field.parentNode.setAttribute("data-error-visible", "false");
  }
}

// Function to check validity of "E-mail" input

function checkEmail() {
  if (emailInput.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/)) {
    emailInput.parentNode.setAttribute("data-error-visible", "false");
  } else {
    emailInput.parentNode.setAttribute("data-error-visible", "true");
  }
}

// Function to check validity of "Date de naissance" input

function checkBirthDate() {
  let today = new Date;
  let minAgeParticipation = 86400000; //Minimum age to participate: 1 day in ms
  if (!isNaN(Date.parse(birthDateInput.value)) && Date.parse(birthDateInput.value) < (Date.parse(today) - minAgeParticipation)) {
    birthDateInput.parentNode.setAttribute("data-error-visible", "false");
  } else {
    birthDateInput.parentNode.setAttribute("data-error-visible", "true");
  }
}

// Function to check validity of "Nombre de participation à un tournoi" input

function checkTournamentQuantity() {
  if (tournamentQuantityInput.value != "" && tournamentQuantityInput.value >= 0 && tournamentQuantityInput.value <= 99) {
    tournamentQuantityInput.parentNode.setAttribute("data-error-visible", "false");
  } else {
    tournamentQuantityInput.parentNode.setAttribute("data-error-visible", "true");
  }
}

// Function to check if one tournament is selected

function checkTournamentSelection() {
  for (let tournamentCheckBox of tournamentCheckBoxes) {
    if (tournamentCheckBox.checked) {
      tournamentCheckBox.parentNode.setAttribute("data-error-visible", "false");
      break;
    } else {
      tournamentCheckBox.parentNode.setAttribute("data-error-visible", "true");
    }
  }
}

// Function to check if terms of use check box is checked

function checkTermsOfUseSelection() {
  if (termsOfUseCheckBox.checked) {
    termsOfUseCheckBox.parentNode.setAttribute("data-error-visible", "false");
  } else {
    termsOfUseCheckBox.parentNode.setAttribute("data-error-visible", "true");
  }
}

// Use previous functions and check the form

function checkForm(e) {
  e.preventDefault();

  checkFirstName();
  checkLastName();
  checkEmail();
  checkBirthDate();
  checkTournamentQuantity();
  checkTournamentSelection();
  checkTermsOfUseSelection();

  //set an array with all "data-error-visible" attribute values
  const allDataErrorVisibleAttribute = [];
  for (let data of formData) {
    allDataErrorVisibleAttribute.push(data.getAttribute("data-error-visible"));
  }
  //test if all array elements are "false" and validate form
  if (allDataErrorVisibleAttribute.every((attributeValue) => attributeValue === "false")) {
    console.log("formulaire valide");
    //validate form here
  }
}

// Function wrappers for event listeners of "Prénom" and "Nom" fields

function checkFirstName() {
  checkName(firstNameInput);
}

function checkLastName() {
  checkName(lastNameInput);
}

// Event listener on all inputs for dynamic checks

firstNameInput.addEventListener("input", checkFirstName);
lastNameInput.addEventListener("input", checkLastName);
emailInput.addEventListener("input", checkEmail);
birthDateInput.addEventListener("input", checkBirthDate);
tournamentQuantityInput.addEventListener("input", checkTournamentQuantity);
formData[5].addEventListener("input", checkTournamentSelection);
termsOfUseCheckBox.addEventListener("input", checkTermsOfUseSelection);

// Check form event

document.querySelector(".btn-submit").addEventListener("click", checkForm);