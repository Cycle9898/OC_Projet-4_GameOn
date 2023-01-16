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
const allCheckBoxes = document.querySelectorAll("span.checkbox-icon");

///////////////////////////////////////////////////////////////////////////////

// Function to toggle items display on burger menu (mobile)

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

// Function to set all error messages with "data-error" attribute and hide them

function setErrorMessages() {
  for (let i = 0; i <= 6; i++) {
    const errorMessages = ['Le champ "Prénom" doit contenir au minimum 2 caractères',
      'Le champ "Nom" doit contenir au minimum 2 caractères',
      "Veuillez entrer une adresse email valide",
      "Veuillez entrer une date de naissance valide",
      "Veuillez entrer un nombre compris entre 0 et 99",
      "Veuillez choisir un tournoi",
      "Merci d'accepter les conditions d'utilisation avant de poursuivre"];

    formData[i].setAttribute("data-error", errorMessages[i]);
    formData[i].setAttribute("data-error-visible", "false");
  }
}

// Launch modal form with pre-loaded error messages

function launchModal() {
  modalBg.style.display = "block";
  setErrorMessages();
}

///////////////////////////////////////////////////////////////////////////////

// Function to reset modal default style

function resetModal() {
  document.getElementById("modal-form").reset(); //clear form inputs
  modalBg.removeAttribute("style"); //remove closure animation
  modalBg.style.display = "none";
  for (let data of formData) {
    data.removeAttribute("style");
  }
  for (let checkbox of allCheckBoxes) {
    checkbox.classList.remove("remove-transition");
  }
  document.querySelector("input.btn-submit").removeAttribute("style");
  document.querySelector(".valid-form").removeAttribute("style");
}

// Function to close modal with an animation and reset form

function closeModal() {
  modalBg.style.animation = "modalopen 800ms reverse";
  setTimeout(resetModal, 800);
}

// Close modal event

closeModalBtn.addEventListener("click", closeModal);

///////////////////////////////////////////////////////////////////////////////

// Function to check validity of "Nom" or "Prénom" input

function checkName(field) {
  if (field.value.length >= 2) {
    field.parentNode.setAttribute("data-error-visible", "false");
  } else {
    field.parentNode.setAttribute("data-error-visible", "true");
  }
}

// Function to check validity of "E-mail" input

function checkEmail() {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/; //RegExp of valid email
  if (emailPattern.test(emailInput.value)) {
    emailInput.parentNode.setAttribute("data-error-visible", "false");
  } else {
    emailInput.parentNode.setAttribute("data-error-visible", "true");
  }
}

// Function to check validity of "Date de naissance" input

function checkBirthDate() {
  const todayInMs = Date.now();
  const minAgeParticipation = 86400000; //Minimum age to participate: 1 day in ms
  if (!isNaN(Date.parse(birthDateInput.value)) && Date.parse(birthDateInput.value) < (todayInMs - minAgeParticipation)) {
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

// Function to display confirmation message

function displayConfirmationMessage() {
  //remove checkbox transitions
  for (let checkbox of allCheckBoxes) {
    checkbox.classList.add("remove-transition");
  }
  //hide all form element
  for (let data of formData) {
    data.style.visibility = "hidden";
  }
  document.querySelector("input.btn-submit").style.display = "none";
  //display confirmation message element
  document.querySelector(".valid-form").style.display = "block";
}

// Function to check and valid the form

function checkForm(event) {
  event.preventDefault();

  //use previous functions to check the form
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
  //test if all array elements are "false" to validate form
  if (allDataErrorVisibleAttribute.every((attributeValue) => attributeValue === "false")) {
    //Send data to the server here and then display confirmation message
    displayConfirmationMessage();
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