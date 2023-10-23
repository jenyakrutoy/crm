import { serverPatchWorkers, errorMessage, serverDeleteWorkers } from './server.js'
import { tooltip } from './tooltip.js'
import { validation } from './validate.js'
import { newElement } from './popup-add-worker.js'
import { workersArray, render, deleteWorker, $popupDeleteBtn, hash } from './main.js'
import { popupDeleteWorkerOpen, popupDeleteWorkerClose } from './popup-delete-worker.js'


const bodyScrollLock = document.body


// * Получаем список работников
const $workersList = document.getElementById('workers__list')



//*================ функция создания разметки попапа нового работника ====================
export function popupChangeWorker() {

  const closePopupBtn = `
  <svg width='17' height='17' viewbox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fill-rule='evenodd' clip-rule='evenodd'
      d='M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z'
      fill='#B0B0B0' />
  </svg>`


  const popupFormSelectClose = `
  <svg width='8' height='8' viewbox='0 0 8 8' fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M3.99996 0.666992C3.63329 0.666992 3.33329 0.966992 3.33329 1.33366V3.33366H1.33329C0.966626 3.33366 0.666626 3.63366 0.666626 4.00033C0.666626 4.36699 0.966626 4.66699 1.33329 4.66699H3.33329V6.66699C3.33329 7.03366 3.63329 7.33366 3.99996 7.33366C4.36663 7.33366 4.66663 7.03366 4.66663 6.66699V4.66699H6.66663C7.03329 4.66699 7.33329 4.36699 7.33329 4.00033C7.33329 3.63366 7.03329 3.33366 6.66663 3.33366H4.66663V1.33366C4.66663 0.966992 4.36663 0.666992 3.99996 0.666992Z'
      fill='#9873FF' />
  </svg>`


  const popupChangeWorker = newElement({
    tag: 'div',
    params: {
      classList: ['popup'],
      id: 'popup-change-worker',
    },
    parent: document.body,
  })


  const popupBody = newElement({
    tag: 'div',
    params: {
      classList: ['popup__body'],
    },
    parent: popupChangeWorker,
  })


  const popupWrap = newElement({
    tag: 'div',
    params: {
      classList: ['popup__wrap'],
    },
    parent: popupBody,
  })


  const popupTitle = newElement({
    tag: 'h2',
    params: {
      classList: ['popup__title'],
      id: 'popup-change-user-title',
      textContent: 'Изменить данные',
    },
    parent: popupWrap,
  })


  const popupBtn = newElement({
    tag: 'button',
    params: {
      classList: ['popup__close', 'btn'],
      id: 'popup-change-user-close',

      innerHTML: closePopupBtn,
    },
    parent: popupWrap,
  })


  const popupForm = newElement({
    tag: 'form',
    params: {
      classList: ['popup__form'],
      id: 'popup-form-change',
    },
    parent: popupWrap,
  })


  //*===========================Форма ФИО, инпут - Фамилия=============================


  const popupFormLabelSurname = newElement({
    tag: 'div',
    params: {
      classList: ['popup__form-label'],
    },
    parent: popupForm,
  })


  const popupInputSurname = newElement({
    tag: 'input',
    params: {
      classList: ['popup__input', 'popup__input-change'],

      id: 'input-popup-change-surname',
      type: 'text',
      name: 'surname',
    },
    parent: popupFormLabelSurname,
  })


  const popupLabelSpanSurname = newElement({
    tag: 'span',
    params: {
      textContent: 'Фамилия',
    },
    parent: popupFormLabelSurname,
  })


  const popupLabelStrongSurname = newElement({
    tag: 'strong',
    params: {
      textContent: '*',
    },
    parent: popupLabelSpanSurname,
  })


  //*============================Форма ФИО, инпут -  Имя================================


  const popupFormLabelName = newElement({
    tag: 'div',
    params: {
      classList: ['popup__form-label'],
    },
    parent: popupForm,
  })


  const popupFormInputName = newElement({
    tag: 'input',
    params: {
      classList: ['popup__input', 'popup__input-change'],

      id: 'input-popup-change-name',
      type: 'text',
      name: 'name',
    },
    parent: popupFormLabelName,
  })


  const popupFormLabelSpanName = newElement({
    tag: 'span',
    params: {
      textContent: 'Имя',
    },
    parent: popupFormLabelName,
  })


  const popupFormLabelStrongName = newElement({
    tag: 'strong',
    params: {
      textContent: '*',
    },
    parent: popupFormLabelSpanName,
  })


  //*=========================Форма ФИО, инпут - Отчество===============================


  const popupFormLabelLastName = newElement({
    tag: 'div',
    params: {
      classList: ['popup__form-label'],
    },
    parent: popupForm,
  })


  const popupFormInputLastName = newElement({
    tag: 'input',
    params: {
      classList: ['popup__input', 'popup__input-change'],
      id: 'input-popup-change-lastname',
      type: 'text',
      name: 'lastName',
    },
    parent: popupFormLabelLastName,
  })


  const popupFormLabelSpanLastName = newElement({
    tag: 'span',
    params: {
      textContent: 'Отчество',
    },
    parent: popupFormLabelLastName,
  })



  const popupFormLabelStrongLastName = newElement({
    tag: 'strong',
    params: {
      textContent: '*',
    },
    parent: popupFormLabelSpanLastName,
  })


  //*==================================Селекты=====================================


  const popupFormSelect = newElement({
    tag: 'div',
    params: {
      classList: ['popup-form'],
      // id: 'popup-form-change',
    },
    parent: popupForm,
  })


  const popupFormSelectBtn = newElement({
    tag: 'button',
    params: {
      classList: ['popup-form-button-add', 'btn'],
      type: 'button',
    },
    parent: popupFormSelect,
  })


  const popupFormSelectBtnSpan = newElement({
    tag: 'span',
    params: {
      classList: ['popup-form-button-add-svg-wrap'],
      innerHTML: popupFormSelectClose,
    },
    parent: popupFormSelectBtn,
  })


  const popupFormSelectBtnStrong = newElement({
    tag: 'strong',
    params: {
      textContent: 'Добавить контакт',
    },
    parent: popupFormSelectBtn,
  })



  //*==========================Кнопки сохранить, отмена==============================


  const popupBtnSave = newElement({
    tag: 'button',
    params: {
      classList: ['popup__button-save', 'btn'],
      id: 'popup-change-save-worker',
      textContent: 'Сохранить',
      type: 'submit',
    },
    parent: popupForm,
  })


  const popupBtnSaveSpinner = newElement({
    tag: 'span',
    params: {
      classList: ['spinner-save-btn'],
    },
    parent: popupBtnSave,
  })




  const popupBtnSaveSpinnerSpan = newElement({
    tag: 'span',
    params: {},
    parent: popupBtnSaveSpinner,
  })



  const popupBtnDel = newElement({
    tag: 'button',
    params: {
      classList: ['popup__button-del', 'btn'],
      id: 'popup-del-chanel-btn',
      textContent: 'Удалить клиента',
    },
    parent: popupWrap,
  })
}

popupChangeWorker()


//*===============================Обработчики событий=====================================

//*=========================== закрытие попапа по кнопкам =================================
const closeBtnArr = ['popup-change-user-close']


function popupCloseButtons() {
  popupChangeWorkerClose()
}


//*============================= закрытие попапа по ESC ===================================
function popupCloseESC(e) {
  if (e.which === 27) {
    popupChangeWorkerClose()
  }
}


//*==================== закрытие попапа по клику в пустой области =========================
function popupCloseArea(event) {
  if (
    !event.target.closest('.popup__wrap') &&
    !event.target.closest('.popup-form-input-close') &&
    !event.target.closest('.popup-form-button-add') &&
    !event.target.closest('.dropdown__button') && event.buttons === 1) {
    popupChangeWorkerClose()
  }
}


//*==================== обработчик transform placeholder-ов для инпутов ========================
const inputFields = document.querySelectorAll('.popup__input-change')

function inputContent() {
  inputFields.forEach((field) => {
    if (field.value !== '') {
      field.classList.add('has-content')
    } else {
      field.classList.remove('has-content')
    }
  })
}

//!=========================== создание разметки инпутов в селектах =================================
// * Находим текущий попап
export const popupChangeWorkerId = document.getElementById('popup-change-worker')


// * Находим кнопку 'добавить контакт' в текущем попапe
export const popupAddSelectBtn = popupChangeWorkerId.querySelector('.popup-form-button-add')


// * Разметка для кажого инпута

const formSelectTel = `<input class='popup-form-input__input' type='tel' name='contact-value' placeholder='Введите телефон' data-select="tel">`
const formSelectEmail = `<input class='popup-form-input__input' type='text' name='contact-value' placeholder='Введите email' data-select="email">`
const formSelectFB = `<input class='popup-form-input__input' type='text' name='contact-value' placeholder='Введите адрес страницы Facebook' data-select="fb">`
const formSelectVK = `<input class='popup-form-input__input' type='text' name='contact-value' placeholder='Введите адрес страницы VK' data-select="vk">`
const formSelectAnoth = `<input class='popup-form-input__input' type='text' name='contact-value' placeholder='Введите данные контакта' data-select="anoth">`


// * Глобальная перменнаая изменяемого значения селекта
let contactType = 'Телефон'


// * Функция подстановки нужного инпута в разметку селекта
function getFormSelectMarkup(contactType) {
  switch (contactType) {
    case 'Телефон':
      return formSelectTel
    case 'Email':
      return formSelectEmail
    case 'VK':
      return formSelectVK
    case 'Facebook':
      return formSelectFB
    case 'Другое':
      return formSelectAnoth
    default:
      return formSelectTel
  }
}



// * Функция создания разметки селектов в зависимости от значения контакта
function getFormSelectInputs(formSelectMarkup, formSelectMarkupValue) {
  return `
        <div class='popup-form-input'>
          <div class='popup-form-input__select'>
            <div class='dropdown'>
              <button class='dropdown__button' type='button'>${formSelectMarkupValue}</button>
              <ul class='dropdown__list'>
                <li class='dropdown__list-item' data-value='Телефон'>Телефон</li>
                <li class='dropdown__list-item' data-value='Email'>Email</li>
                <li class='dropdown__list-item' data-value='Facebook'>Facebook</li>
                <li class='dropdown__list-item' data-value='VK'>VK</li>
                <li class='dropdown__list-item' data-value='Другое'>Другое</li>
              </ul>
              <input class='dropdown__input-hidden' type='text' name='contact-type' value=${contactType}>
              </div>
          </div>
          <div class='popup-form-input-wrap'>
            ${formSelectMarkup}
          </div>
          <button class='popup-form-input-close tooltip-js' data-tippy-content='Удалить контакт' type='button' aria-label='true'>
            <svg width='16' height='16' viewbox='0 0 16 16' fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <g clip-path='url(#clip0_121_1083)'>
                <path
                  d='M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z'
                  fill='#B0B0B0' />
              </g>
              <defs>
                <clippath>
                  <rect width='16' height='16' fill='white' />
                </clippath>
              </defs>
            </svg>
          </button>
        </div>`
}





// * Значение кнопки по умолчанию (телефон)
const formSelectMarkupValue = 'Телефон'


// * Нужный инпут
const formSelectMarkup = getFormSelectMarkup(contactType)


// * Сама функция с разметкой
const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)


// * Изменение значения инпута по клику
function changeSelect(dropdownItem) {
  const selectInput = dropdownItem.closest('.popup-form-input').querySelector('.popup-form-input-wrap')
  const value = dropdownItem.dataset.value


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


// * Удаление селекта по клику
function deleteSelectInput(buttonClose) {
  const formSelect = buttonClose.closest('.popup-form-input')
  formSelect.remove()
  checkSelectsCount()
}


// * Кнопка закрытия + изменение значения инпута
function selectActions(event) {
  const target = event.target

  if (target.closest('.popup-form-input-close')) {
    deleteSelectInput(target)
  } else if (target.classList.contains('dropdown__list-item')) {
    changeSelect(target)
  }
}


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

  allOpenDropdowns.forEach((dropdown) => {
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
function onSelectRemove(e) {
  const buttons = Array.from(
    popupChangeWorkerId.querySelectorAll('.dropdown__button')
  )
  const dropDowns = popupChangeWorkerId.querySelectorAll('.dropdown__list')

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
popupChangeWorkerId.addEventListener('click', onSelectRemove)


tooltip()


// * Показ/скрытие кнопки 'добавить контакт'
function checkSelectsCount() {
  const formSelectLength = popupChangeWorkerId.querySelectorAll('.popup-form-input')

  if (formSelectLength.length <= 9) {
    popupAddSelectBtn.classList.remove('popup-form-button-add-none')
  } else {
    popupAddSelectBtn.classList.add('popup-form-button-add-none')
  }
}


// ! ======================== добавление нового селекта по клику ==========================

function addSelectInput() {
  popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)


  // * добавляем маску телефону
  const telMask = document.querySelectorAll('input[type="tel"]')

  for (const tel of telMask) {

    function handleFocusAndClick() {
      Inputmask({ mask: '+7 (999) 999-99-99' }).mask(tel)
    }

    tel.addEventListener('focus', handleFocusAndClick)
    tel.addEventListener('click', handleFocusAndClick)
  }


  checkSelectsCount()

  // * Получаем все элементы селекта (включая новый)
  const formSelects = popupChangeWorkerId.querySelectorAll('.popup-form-input')

  // * Создаем массив из Nodelist
  const selectArray = Array.from(formSelects)

  // * Получаем только что добавленный селект
  const lastSelect = selectArray[selectArray.length - 1]

  // * Назначаем обработчик событий только на новый селект
  lastSelect.addEventListener('click', selectListener)
  lastSelect.addEventListener('click', selectActions)

  tooltip()

}


// ! =========================== изменение работника по кнопке ==================================

// * Глобальная переменная id внутри попапа
export let workerId

// * Глобальная переменная id из title внутри попапа
let workerTitleID

// * Кнопка 'удалить клиента' внутри попапа
let $popupDeleteChanelBtn


// * Прелоадер в кнопке "изменить"
export let $targetChangeIcon
export let $targetChangeIconPreload


// * Глобальная переменная для кнопки submit в форме, чтобы одноименная функция была доступна по всему коду
let changeWorker


let deleteWorkerChange


// * Клик на кнопку 'изменить' в строке работника
$workersList.addEventListener('click', (event) => {
  if (event.target.getAttribute('data-btn') === 'change') {
    const $btnChange = event.target

    // * Определяем локально элемент прелоадера в кнопке
    $targetChangeIcon = $btnChange.querySelector('.workers-table__list-btn-change-svg')
    $targetChangeIconPreload = $btnChange.querySelector('.workers-table__list-btn-change-svg-preloader')

    changeWorkerPopup(event)
  }
})


// * Проверка, что кликнутый работник в таблице соответствует работнику из массива
export function changeWorkerPopup(event) {

  // * создаем спиннер
  const spinner = document.createElement('div')
  spinner.classList.add('spinner-change-popup')

  const spinnerDiv = document.createElement('div')
  const body = document.querySelector('body')

  spinner.append(spinnerDiv)
  body.append(spinner)


  const $btnChange = event.target
  const $workerTR = $btnChange.closest('tr')
  workerId = $workerTR.querySelector('.workers-table__list-id').textContent // * textConent айдишника работника в ячейке


  // * Добавляем id работника в заголовок попапа
  workerTitleID = document.createElement('span')
  workerTitleID.textContent = `ID: ${workerId}`
  const workerTitleIDElem = document.getElementById('popup-change-user-title')
  workerTitleIDElem.append(workerTitleID)


  // * Получаем конкретного работника из массива по id
  const workerID = workersArray.find(function (worker) {

    // * Объект workerID по айдишнику
    return worker.id === workerId
  })


  // * Получаем свойства конкретного работника
  const { name, surname, lastName, contacts } = workerID


  // * Проверяем значения полей конкретного работника и выводим их на экран
  if (name !== null) {
    const $inputName = document.getElementById('input-popup-change-name')
    $inputName.value = name
  }


  if (surname !== null) {
    const $inputSurname = document.getElementById('input-popup-change-surname')
    $inputSurname.value = surname
  }


  if (lastName !== null) {
    const $inputLastname = document.getElementById('input-popup-change-lastname')
    $inputLastname.value = lastName
  }


  // * Проверяем значения cелектов конкретного работника и выводим их на экран
  if (contacts !== null) {

    // * Проверка контакта с телефоном
    const telContacts = contacts.filter(function (contact) {
      return contact.type === 'Телефон'
    })


    function handlePhoneContact() {

      if (telContacts.length === 0) {
        return
      }

      // * Получаем все value телефонов
      const telValues = telContacts.map(function (contact) {
        return contact.value
      })


      for (const telContact of telValues) {
        contactType = 'Телефон'
        const formSelectMarkupValue = 'Телефон'
        const formSelectMarkup = getFormSelectMarkup(contactType)
        const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)
        popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)
      }

      // * Устанавливаем значение селекта из массива значений по индексу
      const selectElements = popupChangeWorkerId.querySelectorAll('.popup-form-input__input[data-select="tel"]')


      selectElements.forEach((select, index) => {
        select.value = telValues[index]
      })
    }

    handlePhoneContact()



    // * Проверка контакта с email
    const emailContact = contacts.filter(function (contact) {
      return contact.type === 'Email'
    })

    function handleEmailContact() {

      if (emailContact.length === 0) {
        return
      }

      contactType = 'Email'
      const formSelectMarkupValue = 'Email'
      const formSelectMarkup = getFormSelectMarkup(contactType)
      const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)

      popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)
      const emailValue = emailContact[0].value
      const $inputEmail = popupChangeWorkerId.querySelector('.popup-form-input__input[data-select="email"]')

      $inputEmail.value = emailValue
    }

    handleEmailContact()



    // * Проверка контакта с fb
    const fbContact = contacts.filter(function (contact) {
      return contact.type === 'Facebook'
    })


    function handleFBContact() {

      if (fbContact.length === 0) {
        return
      }


      contactType = 'Facebook'
      const formSelectMarkupValue = 'Facebook'
      const formSelectMarkup = getFormSelectMarkup(contactType)
      const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)

      popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)

      const fbValue = fbContact[0].value
      const $inputFB = popupChangeWorkerId.querySelector('.popup-form-input__input[data-select="fb"]')

      $inputFB.value = fbValue
    }

    handleFBContact()




    // * Проверка контакта с vk
    const vkContact = contacts.filter(function (contact) {
      return contact.type === 'VK'
    })

    function handleVKContact() {

      if (vkContact.length === 0) {
        return
      }


      contactType = 'VK'
      const formSelectMarkupValue = 'VK'
      const formSelectMarkup = getFormSelectMarkup(contactType)
      const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)

      popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)

      const vkValue = vkContact[0].value
      const $inputVK = popupChangeWorkerId.querySelector('.popup-form-input__input[data-select="vk"]')


      $inputVK.value = vkValue
    }

    handleVKContact()



    // * Проверка контакта с vk
    const anothContact = contacts.filter(function (contact) {
      return contact.type === 'Другое'
    })


    function handleAnothContact() {

      if (anothContact.length === 0) {
        return
      }

      // * Получаем все value телефонов
      const anothValues = anothContact.map(function (contact) {
        return contact.value
      })


      for (const anothContact of anothValues) {
        contactType = 'Другое'
        const formSelectMarkupValue = 'Другое'
        const formSelectMarkup = getFormSelectMarkup(contactType)
        const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)
        popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)
      }

      // * Устанавливаем значение селекта из массива значений по индексу
      const selectElements = popupChangeWorkerId.querySelectorAll('.popup-form-input__input[data-select="anoth"]')


      selectElements.forEach((select, index) => {
        select.value = anothValues[index]
      })

    }

    handleAnothContact()
  }

  popupChangeWorkerOpen()


  setTimeout(() => {
    spinner.remove()
  }, 300)


  // ! ================= изменение данных в попапе изменяемого работника ============================



  // * Функция добавления новых данных в работника

  // * Находим форму попапа
  const $formPopupChange = popupChangeWorkerId.querySelector('#popup-form-change')

  changeWorker = function changeWorker() {

    $formPopupChange.removeEventListener('submit', postWorker)
    $formPopupChange.addEventListener('submit', postWorker)
  }

  // * Обработчик события click на кнопке 'Сохранить'
  document.getElementById('popup-change-save-worker').addEventListener('click', changeWorker)


  async function postWorker(event) {
    event.preventDefault()

    if (validation(this) == true) {

      const CONTACT_TYPE = 'contact-type'
      const CONTACT_VALUE = 'contact-value'

      function parseContacts(contacts) {
        const contactsLength = contacts.length
        const preparedContacts = []

        for (let i = 0; i < contactsLength; i += 2) {
          preparedContacts.push({ type: contacts[i], value: contacts[i + 1] })
        }
        return preparedContacts
      }


      function parseFormData(formElement) {
        const formData = new FormData(formElement)
        const resultObj = { contacts: [] }

        for (const pair of formData.entries()) {
          if (pair[0] !== CONTACT_TYPE && pair[0] !== CONTACT_VALUE) {
            resultObj[pair[0]] = pair[1]
          } else {
            resultObj.contacts.push(pair[1])
          }
        }

        resultObj.contacts = parseContacts(resultObj.contacts)

        return resultObj
      }


      // * Собираем данные со всех инпутов через form-data
      const clientData = parseFormData($formPopupChange)


      // * Изменяем работника на сервере
      const serverDataObj = await serverPatchWorkers(workerId, clientData)


      // * Изменяем работника в изначальном массиве
      const index = workersArray.findIndex(function (worker) {
        return worker.id === serverDataObj.id
      })


      if (index !== -1) {
        workersArray[index].id = serverDataObj.id
        workersArray[index].name = serverDataObj.name
        workersArray[index].surname = serverDataObj.surname
        workersArray[index].lastName = serverDataObj.lastName
        workersArray[index].createdAt = serverDataObj.createdAt
        workersArray[index].updatedAt = serverDataObj.updatedAt
        workersArray[index].contacts = serverDataObj.contacts
      }

      render(workersArray)

      popupChangeWorkerClose()
    }
  }

  // !===================удаление данных в попапе изменяемого работника====================
  $popupDeleteChanelBtn = document.getElementById('popup-del-chanel-btn')


  // * Клик по кнопке удалить в таблице
  $popupDeleteChanelBtn.addEventListener('click', () => {
    popupDeleteWorkerOpen()
    popupChangeWorkerClose()

    $popupDeleteBtn.addEventListener('click', deleteWorkerChange)
  })


  // * функция удаления в изменяемом работнике
  deleteWorkerChange = async function deleteWorkerChange() {

    await serverDeleteWorkers(workerId)

    let workersArrayDelete = workersArray.filter(function (item) {
      return item.id !== workerId
    })

    render(workersArrayDelete)

    popupDeleteWorkerClose()

    $popupDeleteBtn.removeEventListener('click', deleteWorkerChange)
  }





  // * Добавление хеша в url
  function changeModalURL(id) {
    window.location.replace(`#${id} `) // изменяем хэш
  }

  changeModalURL(workerId)



  // * Настройки селектов
  const formSelects = popupChangeWorkerId.querySelectorAll('.popup-form-input')

  formSelects.forEach((inputs) => {
    inputs.addEventListener('click', selectListener)
    inputs.addEventListener('click', selectActions)
  })


  tooltip()
}




// * Функция создания Попапа из хеша, которая открывает его при перезагрузке страницы
export function changeWorkerPopupHASH() {

  workerId = hash
  const id = workerId.slice(1)

  // * Добавляем id работника в заголовок попапа
  workerTitleID = document.createElement('span')
  workerTitleID.textContent = `ID: ${id}`
  const workerTitleIDElem = document.getElementById('popup-change-user-title')
  workerTitleIDElem.append(workerTitleID)


  // * Получаем конкретного работника из массива по id
  const workerID = workersArray.find(function (worker) {


    // * Объект workerID по айдишнику
    return worker.id === id
  })


  // * Получаем свойства конкретного работника
  const { name, surname, lastName, contacts } = workerID


  // * Проверяем значения полей конкретного работника и выводим их на экран
  if (name !== null) {
    const $inputName = document.getElementById('input-popup-change-name')
    $inputName.value = name
  }


  if (surname !== null) {
    const $inputSurname = document.getElementById('input-popup-change-surname')
    $inputSurname.value = surname
  }


  if (lastName !== null) {
    const $inputLastname = document.getElementById('input-popup-change-lastname')
    $inputLastname.value = lastName
  }


  // * Проверяем значения cелектов конкретного работника и выводим их на экран
  if (contacts !== null) {

    // * Проверка контакта с телефоном
    const telContacts = contacts.filter(function (contact) {
      return contact.type === 'Телефон'
    })


    function handlePhoneContact() {

      if (telContacts.length === 0) {
        return
      }

      // * Получаем все value телефонов
      const telValues = telContacts.map(function (contact) {
        return contact.value
      })


      for (const telContact of telValues) {
        contactType = 'Телефон'
        const formSelectMarkupValue = 'Телефон'
        const formSelectMarkup = getFormSelectMarkup(contactType)
        const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)
        popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)
      }

      // * Устанавливаем значение селекта из массива значений по индексу
      const selectElements = popupChangeWorkerId.querySelectorAll('.popup-form-input__input[data-select="tel"]')


      selectElements.forEach((select, index) => {
        select.value = telValues[index]
      })
    }

    handlePhoneContact()


    // * Проверка контакта с email
    const emailContact = contacts.filter(function (contact) {
      return contact.type === 'Email'
    })

    function handleEmailContact() {

      if (emailContact.length === 0) {
        return
      }

      contactType = 'Email'
      const formSelectMarkupValue = 'Email'
      const formSelectMarkup = getFormSelectMarkup(contactType)
      const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)

      popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)
      const emailValue = emailContact[0].value
      const $inputEmail = popupChangeWorkerId.querySelector('.popup-form-input__input[data-select="email"]')

      $inputEmail.value = emailValue
    }

    handleEmailContact()





    // * Проверка контакта с fb
    const fbContact = contacts.filter(function (contact) {
      return contact.type === 'Facebook'
    })


    function handleFBContact() {

      if (fbContact.length === 0) {
        return
      }


      contactType = 'Facebook'
      const formSelectMarkupValue = 'Facebook'
      const formSelectMarkup = getFormSelectMarkup(contactType)
      const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)

      popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)

      const fbValue = fbContact[0].value
      const $inputFB = popupChangeWorkerId.querySelector('.popup-form-input__input[data-select="fb"]')

      $inputFB.value = fbValue
    }

    handleFBContact()



    // * Проверка контакта с vk
    const vkContact = contacts.filter(function (contact) {
      return contact.type === 'VK'
    })

    function handleVKContact() {

      if (vkContact.length === 0) {
        return
      }


      contactType = 'VK'
      const formSelectMarkupValue = 'VK'
      const formSelectMarkup = getFormSelectMarkup(contactType)
      const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)

      popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)

      const vkValue = vkContact[0].value
      const $inputVK = popupChangeWorkerId.querySelector('.popup-form-input__input[data-select="vk"]')


      $inputVK.value = vkValue
    }

    handleVKContact()



    // * Проверка контакта с vk
    const anothContact = contacts.filter(function (contact) {
      return contact.type === 'Другое'
    })


    function handleAnothContact() {


      if (anothContact.length === 0) {
        return
      }


      // * Получаем все value телефонов
      const anothValues = anothContact.map(function (contact) {
        return contact.value
      })


      for (const anothContact of anothValues) {
        contactType = 'Другое'
        const formSelectMarkupValue = 'Другое'
        const formSelectMarkup = getFormSelectMarkup(contactType)
        const formSelectInputs = getFormSelectInputs(formSelectMarkup, formSelectMarkupValue)
        popupAddSelectBtn.insertAdjacentHTML('beforeBegin', formSelectInputs)
      }

      // * Устанавливаем значение селекта из массива значений по индексу
      const selectElements = popupChangeWorkerId.querySelectorAll('.popup-form-input__input[data-select="anoth"]')


      selectElements.forEach((select, index) => {
        select.value = anothValues[index]
      })

    }

    handleAnothContact()
  }


  popupChangeWorkerOpen()


  // ! ================= изменение данных в попапе изменяемого работника ============================


  // * Функция добавления новых данных в работника

  // * Находим форму попапа
  const $formPopupChange = popupChangeWorkerId.querySelector('#popup-form-change')

  changeWorker = function changeWorker() {
    $formPopupChange.removeEventListener('submit', postWorker)
    $formPopupChange.addEventListener('submit', postWorker)
  }


  // * Обработчик события click на кнопке 'Сохранить'
  document.getElementById('popup-change-save-worker').addEventListener('click', changeWorker)



  // * Обработчик submit формы + form-data
  async function postWorker(event) {
    event.preventDefault()

    if (validation(this) == true) {

      const CONTACT_TYPE = 'contact-type'
      const CONTACT_VALUE = 'contact-value'

      function parseContacts(contacts) {
        const contactsLength = contacts.length
        const preparedContacts = []

        for (let i = 0; i < contactsLength; i += 2) {
          preparedContacts.push({ type: contacts[i], value: contacts[i + 1] })
        }
        return preparedContacts
      }


      function parseFormData(formElement) {
        const formData = new FormData(formElement)
        const resultObj = { contacts: [] }

        for (const pair of formData.entries()) {
          if (pair[0] !== CONTACT_TYPE && pair[0] !== CONTACT_VALUE) {
            resultObj[pair[0]] = pair[1]
          } else {
            resultObj.contacts.push(pair[1])
          }
        }

        resultObj.contacts = parseContacts(resultObj.contacts)

        return resultObj
      }


      // * Собираем данные со всех инпутов через form-data
      const clientData = parseFormData($formPopupChange)

      // * Изменяем работника на сервере
      const serverDataObj = await serverPatchWorkers(id, clientData)

      if (serverDataObj) {
        // * Изменяем работника в изначальном массиве
        const index = workersArray.findIndex(function (worker) {
          return worker.id === serverDataObj.id
        })


        if (index !== -1) {
          workersArray[index].id = serverDataObj.id
          workersArray[index].name = serverDataObj.name
          workersArray[index].surname = serverDataObj.surname
          workersArray[index].lastName = serverDataObj.lastName
          workersArray[index].createdAt = serverDataObj.createdAt
          workersArray[index].updatedAt = serverDataObj.updatedAt
          workersArray[index].contacts = serverDataObj.contacts
        }

        render(workersArray)

        popupChangeWorkerClose()
      }
    }
  }

  // !===================удаление данных в попапе изменяемого работника====================

  $popupDeleteChanelBtn = document.getElementById('popup-del-chanel-btn')


  // * Клик по кнопке удалить в таблице
  $popupDeleteChanelBtn.addEventListener('click', () => {
    popupDeleteWorkerOpen()
    popupChangeWorkerClose()

    $popupDeleteBtn.addEventListener('click', deleteWorkerChange)
  })


  // * функция удаления в изменяемом работнике
  deleteWorkerChange = async function deleteWorkerChange() {

    await serverDeleteWorkers(workerId)

    let workersArrayDelete = workersArray.filter(function (item) {
      return item.id !== workerId
    })

    render(workersArrayDelete)

    popupDeleteWorkerClose()

    $popupDeleteBtn.removeEventListener('click', deleteWorkerChange)
  }


  // * Настройки селектов
  const formSelects = popupChangeWorkerId.querySelectorAll('.popup-form-input')

  formSelects.forEach((inputs) => {
    inputs.addEventListener('click', selectListener)
    inputs.addEventListener('click', selectActions)
  })


  tooltip()
}



//*==================== итоговые функции закрытия/открытия попапов ========================
export function popupChangeWorkerOpen() {


  // * Открытие попапа
  if (!popupChangeWorkerId.classList.contains('open')) {
    bodyScrollLock.classList.add('body', 'lock')
    popupChangeWorkerId.classList.add('open')
  }


  // * Кнопки ESC + пустая область вне попапа попапа
  document.addEventListener('keydown', popupCloseESC)
  popupChangeWorkerId.addEventListener('mousedown', popupCloseArea)


  // * Кнопка X в попапе
  closeBtnArr.forEach((item) => {
    document.getElementById(item).addEventListener('click', popupCloseButtons)
  })


  // * Oбработчик placeholderoв в попапе для изменения стилей
  inputFields.forEach((field) => {
    field.addEventListener('input', inputContent)
  })

  // * Oбработчик placeholderoв в попапе, при его открытии
  inputContent()


  // * Добавление нового селекта по кнопке
  popupAddSelectBtn.addEventListener('click', addSelectInput)


  // * Проверем, сколько инпутов есть в попапе, чтобы показать/скрыть кнопку
  checkSelectsCount()
}


export function popupChangeWorkerClose() {

  // * Закртытие попапа
  if (popupChangeWorkerId.classList.contains('open')) {
    bodyScrollLock.classList.remove('body', 'lock')
    popupChangeWorkerId.classList.remove('open')
  }


  // * Кнопки ESC + пустая область вне попапа попапа
  document.removeEventListener('keydown', popupCloseESC)
  popupChangeWorkerId.removeEventListener('mousedown', popupCloseArea)


  // * Кнопка X в попапе
  closeBtnArr.forEach((item) => {
    document.getElementById(item).removeEventListener('click', popupCloseButtons)
  })


  // * Oбработчик placeholderoв в попапе для изменения стилей
  inputFields.forEach((field) => {
    field.removeEventListener('input', inputContent)
    field.value = ''
  })


  // * Удаление обработчика события из функции удаления изменяемого работника
  const $popupDeleteBtn = document.getElementById('popup-delete-btn')
  $popupDeleteBtn.removeEventListener('click', deleteWorker)
  $popupDeleteBtn.removeEventListener('click', deleteWorkerChange)


  // * Очистка полей
  // * очищение хэша текущего попапа
  window.location.hash = ''


  // * Удаление текущего title в попапе
  workerTitleID.remove()


  // * Удаление динамически созданных полей
  const dynamicFields = document.querySelectorAll('.popup-form-input')
  dynamicFields.forEach((field) => field.remove())


  // * Добавление нового селекта по кнопке (удаляем обработчик)
  popupAddSelectBtn.removeEventListener('click', addSelectInput)


  // * Кнопка 'сохоранить' в изменяемом попапе (удаляем обработчик)
  document.getElementById('popup-change-save-worker').removeEventListener('click', changeWorker)


  // * Удаление сообщения об ошибке
  if (errorMessage) {
    errorMessage.remove()
  }


  // * Коррекция отступов у кнопки 'сохранить' при добавлении ошибки сервера
  const btnSave = document.querySelector('#popup-change-save-worker')
  btnSave.style.margin = '25px auto 15px'
}