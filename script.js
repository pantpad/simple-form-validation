const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => (input.value = ""));
});

const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");

function validateInput(input) {
  return input.checkValidity();
}

function showInputError(input) {
  const errorMessage = input.parentElement.querySelector("span");
  if (input.validity.valueMissing) {
    errorMessage.textContent = `This field cannot be empty`;
    errorMessage.classList.add("error");
  }
  if (input.validity.patternMismatch) {
    console.log("patternMismatch");
  }
  if (input.validity.tooLong) {
    errorMessage.textContent = `${input.getAttribute("id")} too long`;
    errorMessage.classList.add("error");
  }
  if (input.validity.tooShort) {
    errorMessage.textContent = `${input.getAttribute("id")} too short`;
    errorMessage.classList.add("error");
  }
  if (input.validity.typeMismatch) {
    errorMessage.textContent = `Invalid ${input.getAttribute("id")}.`;
    errorMessage.classList.add("error");
  }
}

submitBtn.addEventListener("click", (e) => {
  if (validateAllInputs(email, password, passwordConfirm)) {
    console.log("valido!");
  } else {
    showErrors(email, password, passwordConfirm);
    enableFieldListeners();
    e.preventDefault();
  }
});

// form.addEventListener("submit", (e) => {
//   if (validateAllInputs(email, password, passwordConfirm)) {
//     console.log("submit");
//   } else {
//     e.preventDefault();
//   }
// });

function validateAllInputs(...inputs) {
  let allGood = true;
  inputs.forEach((input) => {
    if (!validateInput(input)) {
      console.log(input.getAttribute("id") + " NON VALIDO");
      allGood = false;
    } else {
      console.log(input.getAttribute("id") + " VALIDO");
    }
  });
  return allGood;
}

function showErrors(...inputs) {
  inputs.forEach((input) => {
    showInputError(input);
  });
}

function passwordMatch() {
  if (password.value == passwordConfirm.value) {
    passwordConfirm.setCustomValidity("");
    passwordConfirm.parentElement.querySelector("span").textContent = "";
  } else {
    passwordConfirm.setCustomValidity("Password Do Not Match!");
    passwordConfirm.parentElement.querySelector("span").textContent =
      "Password Do Not Match!";
    passwordConfirm.parentElement.querySelector("span").classList.add("error");
  }
}
// const input = new HTMLInputElement();
// input.validity.valid = false;

function validatePassword() {
  const errorMessage = password.parentElement.querySelector("span");
  if (password.checkValidity()) {
    errorMessage.textContent = "";
    errorMessage.classList.remove("error");
  } else {
    password.parentElement.querySelector("span").classList.add("error");
    if (password.validity.valueMissing) {
      errorMessage.textContent = `Password cannot be empty`;
      errorMessage.classList.add("error");
    }
    if (password.validity.patternMismatch) {
      errorMessage.textContent = `Password pattern is not correct!`;
      errorMessage.classList.add("error");
    }
    if (password.validity.tooLong) {
      errorMessage.textContent = `Password too long, maximum 20 chars`;
      errorMessage.classList.add("error");
    }
    if (password.validity.tooShort) {
      errorMessage.textContent = `Password too short, minimum 8 chars`;
      errorMessage.classList.add("error");
    }
    if (password.validity.typeMismatch) {
      errorMessage.textContent = `Invalid Password`;
      errorMessage.classList.add("error");
    }
  }
}

function validateEmail() {
  if (email.checkValidity()) {
    email.parentElement.querySelector("span").textContent = "";
    email.parentElement.querySelector("span").classList.remove("error");
  } else {
    email.parentElement.querySelector("span").classList.add("error");
    if (email.validity.typeMismatch) {
      email.parentElement.querySelector("span").textContent =
        "Please enter a valid e-mail address.";
    }
  }
}

function enableFieldListeners() {
  password.addEventListener("input", validatePassword);
  email.addEventListener("input", validateEmail);

  passwordConfirm.addEventListener("input", passwordMatch);
  password.addEventListener("input", passwordMatch);
}

function disableFieldListeners() {
  passwordConfirm.removeEventListener("input", sonoAttivo);
  password.removeEventListener("input", sonoAttivo);
  email.removeEventListener("input", sonoAttivo);
}
