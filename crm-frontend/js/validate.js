export function validation(form) {

  // * Удаление ошибки
  function removeError(input, cssClass) {
    const parent = input.parentNode

    if (parent.classList.contains('error')) {

      if (cssClass === '.error-label') {
        parent.querySelector('.error-label').remove()
      }


      if (cssClass === '.error-label-selects') {
        parent.querySelector('.error-label-selects').remove()
      }

      if (cssClass === '.error-label-selects-tel') {
        parent.querySelector('.error-label-selects-tel').remove()
      }

      // parent.querySelector('.error-label-selects').remove()
      parent.classList.remove('error')
    }
  }


  // * Создание ошибки
  function createError(input, text, ccsClass) {
    const parent = input.parentNode
    const errorLabel = document.createElement('label')
    errorLabel.classList.add(ccsClass)
    errorLabel.textContent = text
    parent.classList.add('error')
    parent.append(errorLabel)
  }


  let result = true


  const inputsFIO = form.querySelectorAll('.popup__input')
  const lastNameNew = form.querySelector('#input-popup-new-lastname')
  const lastNameChange = form.querySelector('#input-popup-change-lastname')


  const inputsSelects = form.querySelectorAll('.popup-form-input__input')


  for (const input of inputsFIO) {

    if (input !== lastNameNew && input !== lastNameChange) {

      removeError(input, '.error-label')

      if (input.value.trim() == "") {
        createError(input, 'Поле не заполнено!', 'error-label')
        result = false
      }

      input.addEventListener('input', () => {
        removeError(input, '.error-label')
      })
    }
  }



  // * Обработка селектов
  for (const input of inputsSelects) {

    // * Обработка всех селектов с пустой строкой
    if (input.value.trim() == "") {

      const errorLabelSelects = document.querySelector('.error-label-selects')

      if (errorLabelSelects) {
        removeError(input, '.error-label-selects')
      }

      createError(input, 'Поле не заполнено!', 'error-label-selects')
      result = false
    }


    if (input.value.trim() == "") {
      removeError(input, '.error-label-selects')
      createError(input, 'Поле не заполнено!', 'error-label-selects')
      result = false
    }


    if (input.value.trim() == "vk.com/id") {
      removeError(input, '.error-label-selects')
      createError(input, 'Поле не заполнено!', 'error-label-selects')
      result = false
    }


    if (input.value.trim() == "facebook.com/") {
      removeError(input, '.error-label-selects')
      createError(input, 'Поле не заполнено!', 'error-label-selects')
      result = false
    }


    // * Обработка селекта с телефоном
    if (input.getAttribute('data-select') === 'tel') {

      const maskedValue = input.value.trim()
      const unmaskedValue = maskedValue.replace(/[^\d]/g, '')

      if (unmaskedValue !== "" && unmaskedValue.length !== 11) {

        removeError(input, '.error-label-selects-tel')
      
        createError(input, 'Здесь должно быть 10 символов без +7', 'error-label-selects-tel')
        result = false


        input.addEventListener('input', () => {
          removeError(input, '.error-label-selects-tel')
        })
      }
    }



    // * Валидация email
    if (input.getAttribute('data-select') === 'email') {

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const value = input.value.trim()

      if (value !== "" && !regex.test(value)) {
        removeError(input, '.error-label-selects')
        createError(input, 'Укажите ваш e-mail!', 'error-label-selects')

        result = false
      }
    }


    // * Обработка селекта с vk
    if (input.getAttribute('data-select') === 'vk') {
    }


    // * Обработка начала ввода в инпут
    input.addEventListener('input', () => {

      const errorLabelSelects = document.querySelector('.error-label-selects')
      const errorLabelSelectsTel = document.querySelector('.error-label-selects-tel')


      if (errorLabelSelects) {
        removeError(input, '.error-label-selects')
      }

      if (errorLabelSelectsTel) {
        removeError(input, '.error-label-selects-tel')
      }
    })
  }

  return result
}