import { tooltip } from './tooltip.js'
import { errorMessage } from './server.js'


const bodyScrollLock = document.body


//!======================= Функция-конструктор разметки попапа ===========================
export function newElement(options) {
  const el = document.createElement(options.tag)

  for (const [key, value] of Object.entries(options.params)) {
    if (key == 'classList') {
      for (const newClass of value) {
        el.classList.add(newClass)
      }
    } else if (key == 'attributes') {
      Object.keys(value).forEach(attrKey => {
        const attrValue = value[attrKey]
        el.setAttribute(attrKey, attrValue)
      })

    } else {
      el[key] = value
    }
  }


  // * Добавление дочерних элементов в el
  if (options.elements !== undefined) {
    for (const element of options.elements) {
      newElement({
        tag: element.tag,
        params: element.params,
        parent: el,
      })
    }
  }

  if (options.parent !== undefined) options.parent.append(el)

  return el
}


//*================ функция создания разметки попапа нового работника ====================
function popupNewWorker() {

  const closePopupBtn = `
  <svg width="17" height="17" viewbox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z"
      fill="#B0B0B0" />
  </svg>`


  const popupFormSelectClose = `
  <svg width="8" height="8" viewbox="0 0 8 8" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.99996 0.666992C3.63329 0.666992 3.33329 0.966992 3.33329 1.33366V3.33366H1.33329C0.966626 3.33366 0.666626 3.63366 0.666626 4.00033C0.666626 4.36699 0.966626 4.66699 1.33329 4.66699H3.33329V6.66699C3.33329 7.03366 3.63329 7.33366 3.99996 7.33366C4.36663 7.33366 4.66663 7.03366 4.66663 6.66699V4.66699H6.66663C7.03329 4.66699 7.33329 4.36699 7.33329 4.00033C7.33329 3.63366 7.03329 3.33366 6.66663 3.33366H4.66663V1.33366C4.66663 0.966992 4.36663 0.666992 3.99996 0.666992Z"
      fill="#9873FF" />
  </svg>`


  const popupNewWorker = newElement({
    tag: 'div',
    params: {
      classList: ['popup'],
      id: 'popup-new-worker',
    },
    parent: document.body
  })

  const popupBody = newElement({
    tag: 'div',
    params: {
      classList: ['popup__body'],
    },
    parent: popupNewWorker
  })

  const popupWrap = newElement({
    tag: 'div',
    params: {
      classList: ['popup__wrap'],
    },
    parent: popupBody
  })

  const popupTitle = newElement({
    tag: 'h2',
    params: {
      classList: ['popup__title'],
      textContent: 'Новый клиент',
    },
    parent: popupWrap
  })

  const popupBtn = newElement({
    tag: 'button',
    params: {
      classList: ['popup__close', 'btn'],
      id: 'popup-new-user-close',

      innerHTML: closePopupBtn,
    },
    parent: popupWrap
  })

  const popupForm = newElement({
    tag: 'form',
    params: {
      classList: ['popup__form'],
      id: 'popup-form'
    },
    parent: popupWrap
  })

  //*===========================Форма ФИО, инпут - Фамилия=============================

  const popupFormLabelSurname = newElement({
    tag: 'div',
    params: {
      classList: ['popup__form-label'],
    },
    parent: popupForm
  })

  const popupInputSurname = newElement({
    tag: 'input',
    params: {
      classList: ['popup__input'],
      id: 'input-popup-new-surname',
      type: 'text',
      name: 'surname',
    },
    parent: popupFormLabelSurname
  })

  const popupLabelSpanSurname = newElement({
    tag: 'span',
    params: {
      textContent: 'Фамилия',
    },
    parent: popupFormLabelSurname
  })

  const popupLabelStrongSurname = newElement({
    tag: 'strong',
    params: {
      textContent: '*',
    },
    parent: popupLabelSpanSurname
  })

  //*============================Форма ФИО, инпут -  Имя================================

  const popupFormLabelName = newElement({
    tag: 'div',
    params: {
      classList: ['popup__form-label'],
    },
    parent: popupForm
  })

  const popupFormInputName = newElement({
    tag: 'input',
    params: {
      classList: ['popup__input'],
      type: 'text',
      name: 'name',
    },
    parent: popupFormLabelName
  })

  const popupFormLabelSpanName = newElement({
    tag: 'span',
    params: {
      textContent: 'Имя',
    },
    parent: popupFormLabelName
  })

  const popupFormLabelStrongName = newElement({
    tag: 'strong',
    params: {
      textContent: '*',
    },
    parent: popupFormLabelSpanName
  })


  //*=========================Форма ФИО, инпут - Отчество===============================

  const popupFormLabelLastName = newElement({
    tag: 'div',
    params: {
      classList: ['popup__form-label'],
    },
    parent: popupForm
  })

  const popupFormInputLastName = newElement({
    tag: 'input',
    params: {
      classList: ['popup__input'],
      id: 'input-popup-new-lastname',
      type: 'text',
      name: 'lastName',
    },
    parent: popupFormLabelLastName
  })

  const popupFormLabelSpanLastName = newElement({
    tag: 'span',
    params: {
      textContent: 'Отчество',
    },
    parent: popupFormLabelLastName
  })

  const popupFormLabelStrongLastName = newElement({
    tag: 'strong',
    params: {
      textContent: '*',
    },
    parent: popupFormLabelSpanLastName
  })

  //*==================================Селекты=====================================

  const popupFormSelect = newElement({
    tag: 'div',
    params: {
      classList: ['popup-form'],
    },
    parent: popupForm
  })

  const popupFormSelectBtn = newElement({
    tag: 'button',
    params: {
      classList: ['popup-form-button-add', 'btn'],
      type: 'button',
    },
    parent: popupFormSelect
  })

  const popupFormSelectBtnSpan = newElement({
    tag: 'span',
    params: {
      classList: ['popup-form-button-add-svg-wrap'],
      innerHTML: popupFormSelectClose,
    },
    parent: popupFormSelectBtn
  })

  const popupFormSelectBtnStrong = newElement({
    tag: 'strong',
    params: {
      textContent: 'Добавить контакт',
    },
    parent: popupFormSelectBtn
  })

  //*==========================Кнопки сохранить, отмена==============================

  const popupBtnSave = newElement({
    tag: 'button',
    params: {
      classList: ['popup__button-save', 'btn'],
      id: 'popup-new-save-worker',
      textContent: 'Сохранить',
      type: 'submit',
    },
    parent: popupForm
  })

  const popupBtnChanel = newElement({
    tag: 'button',
    params: {
      classList: ['popup__button-chanel', 'btn'],
      id: 'popup-new-chanel-btn',
      textContent: 'Отмена',
    },
    parent: popupWrap
  })
}

popupNewWorker()


//*===============================Обработчики событий=====================================

const popupNewWorkerId = document.getElementById('popup-new-worker')


//!создание разметки инпутов в селектах
const popupAddSelect = popupNewWorkerId.querySelector('.popup-form-button-add')


const formSelectTel = `<input class='popup-form-input__input' type='tel' name='contact-value' placeholder='Введите телефон' data-select="tel">`
const formSelectEmail = `<input class='popup-form-input__input' type='text' name='contact-value' placeholder='Введите email' data-select="email">`
const formSelectFB = `<input class='popup-form-input__input' type='text' name='contact-value' placeholder='Введите адрес страницы Facebook' data-select="fb">`
const formSelectVK = `<input class='popup-form-input__input' type='text' name='contact-value' placeholder='Введите адрес страницы VK' data-select="vk">`
const formSelectAnoth = `<input class='popup-form-input__input' type='text' name='contact-value' placeholder='Введите данные контакта' data-select="anoth">`


//!разметка инпута в селектах
export const formSelectInputs = `
<div class="popup-form-input">
  <div class="popup-form-input__select">
    <div class="dropdown">
      <button class="dropdown__button" type="button">Телефон</button>
      <ul class="dropdown__list">
        <li class="dropdown__list-item" data-value="Телефон">Телефон</li>
        <li class="dropdown__list-item" data-value="Email">Email</li>
        <li class="dropdown__list-item" data-value="Facebook">Facebook</li>
        <li class="dropdown__list-item" data-value="VK">VK</li>
        <li class="dropdown__list-item" data-value="Другое">Другое</li>
      </ul>
      <input class="dropdown__input-hidden" type="text" name="contact-type" value="Телефон">

    </div>
  </div>

  <div class="popup-form-input-wrap">
    ${formSelectTel}
  </div>

  <button class="popup-form-input-close tooltip-js" data-tippy-content="Удалить контакт" type="button" aria-label="true">
    <svg width="16" height="16" viewbox="0 0 16 16" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_121_1083)">
        <path
          d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z"
          fill="#B0B0B0" />
      </g>
      <defs>
        <clippath>
          <rect width="16" height="16" fill="white" />
        </clippath>
      </defs>
    </svg>

  </button>
</div>`




// * Показ/скрытие кнопки "добавить контакт"
function checkSelectsCount() {

  const formSelectLength = popupNewWorkerId.querySelectorAll('.popup-form-input')

  if (formSelectLength.length <= 9) {
    popupAddSelect.classList.remove('popup-form-button-add-none')
  } else {
    popupAddSelect.classList.add('popup-form-button-add-none')
  }
}

// ! ==================== добавление селекта по клику ============================
function addSelectInput() {


  popupAddSelect.insertAdjacentHTML('beforeBegin', formSelectInputs)


  // * Добавляем маску телефону
  const telMask = document.querySelectorAll('input[type="tel"]')

  for (const tel of telMask) {

    function handleFocusAndClick() {
      Inputmask({ mask: '+7 (999) 999-99-99' }).mask(tel)
    }

    tel.addEventListener('focus', handleFocusAndClick)
    tel.addEventListener('click', handleFocusAndClick)
  }


  // * Добавляем маску vk, fb
  function addMask(social, arr) {

    const maskInputs = document.querySelectorAll(arr)

    for (const id of maskInputs) {

      // * Вставка маски
      function handleFocusAndClick() {
        if (id.value === '') {
          id.value = social
        }
      }


      // * Обработка внутри маски
      function handleIntoMask(event) {
        const cursorPosition = id.selectionStart
        const maskLength = social.length
        const isCursorIntoMask = cursorPosition <= maskLength && cursorPosition >= 0

        if (isCursorIntoMask && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
          id.setSelectionRange(maskLength, maskLength)
        }

        if (isCursorIntoMask && event.key == 'Backspace') {
          event.preventDefault()
        }
      }


      // * Запрет на ввод букв
      function handleLetter(event) {
        const isNumber = /^\d$/.test(event.key)

        if (!isNumber && event.key !== 'Backspace' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
          event.preventDefault()
        }
      }

      id.addEventListener('focus', handleFocusAndClick)
      id.addEventListener('click', handleFocusAndClick)
      id.addEventListener('keydown', handleIntoMask)
      id.addEventListener('keydown', handleLetter)
    }
  }


  checkSelectsCount()



  // * Получаем все элементы селекта (включая новый)
  const formSelects = popupNewWorkerId.querySelectorAll('.popup-form-input')

  // * Создаем массив из Nodelist 
  const selectArray = Array.from(formSelects)

  // * Получаем только что добавленный селект
  const lastSelect = selectArray[selectArray.length - 1]

  // * Назначаем обработчик событий только на новый селект
  lastSelect.addEventListener('click', selectListener)


  // * Открыть/закрыть селект + кнопка закрытия
  function selectListener(event) {
    const target = event.target

    if (target.classList.contains('dropdown__button')) {
      toggleDropdown(target)

    } else if (target.classList.contains('dropdown__list-item')) {
      selectItem(target)
    }
  }



  // * Клик по кнопке. Открыть/Закрыть select
  function toggleDropdown(button) {

    const formSelect = button.closest('.popup-form-input')
    const dropDownList = formSelect.querySelector('.dropdown__list')

    const dropDownBtn = formSelect.querySelector('.dropdown__button')


    dropDownList.classList.toggle('dropdown__list--visible')
    dropDownBtn.classList.toggle('dropdown__button--active')

    // * После клика на текущий селект, закрываем все другие открытые селекты
    const allOpenDropdowns = document.querySelectorAll('.dropdown__list--visible')
    allOpenDropdowns.forEach(dropdown => {
      if (dropdown !== dropDownList) {
        dropdown.classList.remove('dropdown__list--visible')
        dropdown.closest('.popup-form-input').querySelector('.dropdown__button').classList.remove('dropdown__button--active')
      }
    })
  }


  // * Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
  function selectItem(item) {
    const formSelect = item.closest('.popup-form-input')
    const dropDownBtn = formSelect.querySelector('.dropdown__button')
    const dropDownInput = formSelect.querySelector('.dropdown__input-hidden')

    dropDownBtn.classList.remove('dropdown__button--active')
    dropDownBtn.innerText = item.innerText
    dropDownInput.value = item.dataset.value
  }


  // * Клик снаружи дропдауна. Закрыть дропдаун
  popupNewWorkerId.addEventListener('click', onSelectRemove)

  function onSelectRemove(e) {
    const buttons = Array.from(popupNewWorkerId.querySelectorAll('.dropdown__button'))
    const dropDowns = popupNewWorkerId.querySelectorAll('.dropdown__list')

    const target = e.target

    if (!buttons.includes(target)) {
      buttons.forEach((button) => {
        button.classList.remove('dropdown__button--active')
      })

      dropDowns.forEach((dropdown) => {
        dropdown.classList.remove('dropdown__list--visible')
      })
    }
  }




  // * Назначаем обработчик событий только на новый селект
  lastSelect.addEventListener('click', selectActions)


  // * Кнопка закрытия + изменение значения инпута
  function selectActions(event) {
    const target = event.target

    if (target.closest('.popup-form-input-close')) {
      deleteSelectInput(target)

    } else if (target.classList.contains('dropdown__list-item')) {
      changeSelect(target)
    }
  }


  // * Удаление селекта по клику
  function deleteSelectInput(buttonClose) {

    const formSelect = buttonClose.closest('.popup-form-input')
    formSelect.remove()

    checkSelectsCount()

  }



  // * Изменение значения инпута по клику
  function changeSelect(dropdownItem) {
    const selectInput = dropdownItem.closest('.popup-form-input').querySelector('.popup-form-input-wrap')
    const value = dropdownItem.dataset.value


    if (value === 'Телефон') selectInput.innerHTML = formSelectTel

    if (value === 'Email') {
      selectInput.innerHTML = formSelectEmail
    }


    if (value === 'VK') {
      selectInput.innerHTML = formSelectVK
      addMask('vk.com/id', '[data-select="vk"]')
    }


    if (value === 'Facebook') {
      selectInput.innerHTML = formSelectFB
      addMask('facebook.com/', '[data-select="fb"]')
    }


    if (value === 'Другое') selectInput.innerHTML = formSelectAnoth
  }

  tooltip()

}


//*=========================== закрытие попапа по кнопкам =================================
const closeBtnArr = ['popup-new-chanel-btn', 'popup-new-user-close']

function popupCloseButtons() {
  popupNewWorkerClose()
}


//*============================= закрытие попапа по ESC ===================================
function popupCloseESC(e) {
  if (e.which === 27) {
    popupNewWorkerClose()
  }
}


//*==================== закрытие попапа по клику в пустой области =========================
function popupCloseArea(event) {
  if (!event.target.closest('.popup__wrap') &&
    !event.target.closest('.popup-form-input-close') &&
    !event.target.closest('.popup-form-button-add') &&
    !event.target.closest('.dropdown__button') && event.buttons === 1) {
    popupNewWorkerClose()
  }
}



// //*==================== обработчик transform placeholder-ов для инпутов ========================
const inputFields = document.querySelectorAll('.popup__input')

function inputContent() {
  inputFields.forEach(field => {
    if (field.value !== '') {
      field.classList.add('has-content')
    } else {
      field.classList.remove('has-content')
    }
  })
}


//!==================== итоговые функции закрытия/открытия попапов ========================
export function popupNewWorkerOpen() {

  // * Октрытие попапа
  if (!popupNewWorkerId.classList.contains('open')) {
    bodyScrollLock.classList.add('body', 'lock')
    popupNewWorkerId.classList.add('open')
  }


  // * Кнопки ESC + пустая область вне попапа попапа
  document.addEventListener('keydown', popupCloseESC)
  popupNewWorkerId.addEventListener('mousedown', popupCloseArea)


  // * Кнопка X в попапе
  closeBtnArr.forEach(item => {
    document.getElementById(item).addEventListener('click', popupCloseButtons)
  })


  // * Добавление нового селекта по кнопке
  popupAddSelect.addEventListener('click', addSelectInput)


  // * Oбработчик placeholderoв в попапе для изменения стилей
  inputFields.forEach(field => {
    field.addEventListener('input', inputContent)
  })

}




export function popupNewWorkerClose() {

  // * Закрытие попапа
  if (popupNewWorkerId.classList.contains('open')) {
    bodyScrollLock.classList.remove('body', 'lock')
    popupNewWorkerId.classList.remove('open')
  }


  // * Кнопки ESC + пустая область вне попапа попапа
  document.removeEventListener('input', popupCloseESC)
  popupNewWorkerId.removeEventListener('mousedown', popupCloseArea)


  // * Кнопка X в попапе
  closeBtnArr.forEach(item => {
    document.getElementById(item).removeEventListener('click', popupCloseButtons)
  })


  // * Oбработчик placeholderoв в попапе для изменения стилей
  inputFields.forEach(field => {
    field.value = ''
    field.classList.remove('has-content')
  })


  // * Удаление динамически созданных инпутов
  const dynamicFields = document.querySelectorAll('.popup-form-input')
  dynamicFields.forEach(field => field.remove())


  // * Удаление сообщения об ошибке
  if (errorMessage) {
    errorMessage.remove()
  }


  // * Коррекция отступов у кнопки "сохранить" при добавлении ошибки сервера
  let btnSave = document.querySelector('#popup-new-save-worker')
  btnSave.style.margin = '25px auto 15px'
}