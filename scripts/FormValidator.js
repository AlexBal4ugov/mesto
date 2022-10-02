export default class FormValidator {
  constructor(config, form){
    this._config = config;
    this._form = form;
  }

  resetError() {
    this._inputs.forEach((input) => {
      this._hideError(input);
    });
    this._enableSubmitButton();
  }

  _setError(input){
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.classList.add(this._config.errorClass);
    error.textContent = input.validationMessage;
  }

  _hideError(input){
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass)
    error.classList.remove(this._config.errorClass);
    error.textContent = '';
  }

  _validateInput(input) {
    if (!input.validity.valid) {
      this._setError(input);
    } else {
      this._hideError(input);
    }
  }

  _disableSubmitButton() {
    this._button.classList.add(this._config.inactiveButtonClass);
    this._button.disabled = true;
  }

  _enableSubmitButton() {
    this._button.classList.remove(this._config.inactiveButtonClass);
    this._button.disabled = false;
  }

  _setButtonState() {
    const hasErrors = this._inputs.some(input => !input.validity.valid);
    if (hasErrors) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setValidationHandlers() {
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
        this._setButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setValidationHandlers();
  }
}
