const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function resetError(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  inputs.forEach((input) => {
    hideError(form, input, config);
  });
  const button = form.querySelector(config.submitButtonSelector);
  handleActiveButton(button, config);
}

function setError(form, input, config){
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.classList.add(config.errorClass);
  error.textContent = input.validationMessage;
}

function hideError(form, input, config){
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass)
  error.classList.remove(config.errorClass);
  error.textContent = '';
}

function validateInput(form, input, config) {
  if (!input.validity.valid) {
    setError(form, input, config);
  } else {
    hideError(form, input, config);
  }
}

function handleInactiveButton(button, config) {
  button.classList.add(config.inactiveButtonClass);
  button.disabled = true;
}

function handleActiveButton(button, config) {
  button.classList.remove(config.inactiveButtonClass);
  button.disabled = false;
}

function setButtonState(inputs, button, config) {
  const hasErrors = inputs.some(input => !input.validity.valid);
  if (hasErrors) {
    handleInactiveButton(button, config);
  } else {
    handleActiveButton(button, config);
  }
}

function setValidationHandlers(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      validateInput(form, input, config);
      setButtonState(inputs, button, config);
    });
  });
}

function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);
  formsList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setValidationHandlers(form, config);
  });
}

enableValidation(validationConfig);
