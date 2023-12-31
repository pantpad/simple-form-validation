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
  if (validateAllInputs(email, password, passwordConfirm, zipCode)) {
    console.log("valido!");
  } else {
    showErrors(email, password, passwordConfirm,zipCode);
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

function validatePassword() {
  const errorMessage = password.parentElement.querySelector("span");
  if (checkRegexPassword()) {
    password.setCustomValidity("");
    errorMessage.textContent = "";
    errorMessage.classList.remove("error");
  } else {
    password.setCustomValidity("Please enter a valid e-mail address.");
    errorMessage.classList.add("error");
    errorMessage.textContent = `Please enter a valid password`;
  }
}

function validateEmail() {
  if (checkRegexMail()) {
    email.setCustomValidity("");
    email.parentElement.querySelector("span").textContent = "";
    email.parentElement.querySelector("span").classList.remove("error");
  } else {
    email.setCustomValidity("Please enter a valid e-mail address.");
    email.parentElement.querySelector("span").classList.add("error");
    email.parentElement.querySelector("span").textContent =
      "Please enter a valid e-mail address.";
  }
}

function checkRegexMail() {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(email.value);
}

function checkRegexPassword() {
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return passwordRegex.test(password.value);
}

function enableFieldListeners() {
  removePatterns();
  password.addEventListener("input", validatePassword);
  email.addEventListener("input", validateEmail);
  email.removeAttribute("pattern");
  zipCode.addEventListener("input", validateZip);

  validateZip();
  validatePassword();
  passwordMatch();
  passwordConfirm.addEventListener("input", passwordMatch);
  password.addEventListener("input", passwordMatch);
}

function disableFieldListeners() {
  passwordConfirm.removeEventListener("input", sonoAttivo);
  password.removeEventListener("input", sonoAttivo);
  email.removeEventListener("input", sonoAttivo);
}

function removePatterns() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => input.removeAttribute("pattern"));
}

function getCountriesList() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "./countries.json", true);

  xhr.onload = function () {
    const jsObject = JSON.parse(this.response);
    jsObject.forEach((country) => {
      let countryDuplicate = countrieList.some((element) => {
        return element.country == country.Country;
      });

      if (!countryDuplicate) {
        countrieList.push({
          country: country.Country,
          zip: country.Regex,
        });
      } else {
        //console.log(`Country ${country.Country} esiste`);
        return;
      }
    });
    // console.log(jsObject);
    // console.log(countrieList);
    populateCountrySelector();
  };

  xhr.send();
}
const zipCode = document.getElementById("zip");
const selectCountry = document.getElementById("country");
const countrieList = [];

function populateCountrySelector() {
  countrieList.forEach((item) => {
    const newOption = document.createElement("option");
    newOption.value = item.country;
    newOption.textContent = item.country;
    selectCountry.appendChild(newOption);
  });
}

getCountriesList();

function returnZipFromSelectCountry() {
  return countrieList.find((item) => item.country == selectCountry.value);
}

function doesItMatchTheZipCode() {
  if (selectCountry.value == "") return false;
  const currentRegex = new RegExp(returnZipFromSelectCountry().zip);
  console.log(currentRegex);
  console.log(zipCode.value);
  return currentRegex.test(zipCode.value);
}

function validateZip() {
  if (doesItMatchTheZipCode()) {
    zipCode.setCustomValidity("");
    zipCode.parentElement.querySelector("span").textContent = "";
    zipCode.parentElement.querySelector("span").classList.remove("error");
  } else {
    zipCode.setCustomValidity("Please enter a valid zip code");
    zipCode.parentElement.querySelector("span").classList.add("error");
    zipCode.parentElement.querySelector("span").textContent =
      "Invalid zip code";
  }
}
