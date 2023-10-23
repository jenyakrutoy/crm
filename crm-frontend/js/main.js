import Worker from './Worker.js'
import { popupNewWorkerOpen, popupNewWorkerClose } from './popup-add-worker.js'
import { workerId, changeWorkerPopupHASH } from './popup-change-worker.js'
import { popupDeleteWorkerOpen, popupDeleteWorkerClose } from './popup-delete-worker.js'
import { createTelIcon, createEmailIcon, createVKIcon, createFBIcon, createUserIcon } from './icons.js'
import { tooltip } from './tooltip.js'
import { validation } from './validate.js'
import { serverAddWorkers, serverGetWorkers, serverDeleteWorkers } from './server.js'


// * Создаем массив студентов
export let workersArray = []


// * Первичный запрос массива работников из сервера
const serverData = await serverGetWorkers()


// * Проверка на существование данных в массиве работников
if (serverData) {
  for (let item of serverData) {
    workersArray.push(new Worker(
      item.id,
      item.name,
      item.surname,
      item.lastName,
      item.createdAt,
      item.updatedAt,
      item.contacts,
    ))
  }
}


// ! =================================================== хэш =======================================================

export let hash

hash = window.location.hash

if (hash) {
  changeWorkerPopupHASH()
}


// ! ==================== функция-конструктор, создающая DOM элемент работника в таблице ===========================

export function newElement(tag, className, id, content, attributes) {
  const el = document.createElement(tag)

  if (className) className.split(' ').forEach(function (classlist) {
    el.classList.add(classlist.trim())
  })

  if (className) el.className = className

  if (id) el.id = id

  if (content) el.textContent = content

  if (attributes) {
    Object.keys(attributes).forEach(element => {
      const value = attributes[element]
      el.setAttribute(element, value)
    })
  }

  return el
}


// * Получаем список работников
const $workersList = document.getElementById('workers__list')

// ! ============================ создание работника из класса =================================

export function newWorkerTR(worker) {

  const $workerTr = document.createElement('tr'),
    $idTD = newElement('td', 'workers-table__list-id', worker.id, worker.id, ''),
    $fioTD = newElement('td', 'workers-table__list-fio', null, worker.fio, ''),
    $createdAtTD = newElement('td', 'workers-table__list-createdAt', null, worker.getCreateDateString(), ''),
    $createdSpan = newElement('span', 'workers-table__list-createdAt', null, worker.getCreateDateTimeString(), ''),
    $updatedAtTD = newElement('td', 'workers-table__list-updatedAt', null, worker.getUpdatedDateString(), ''),
    $updatedSpan = newElement('span', 'workers-table__list-updateddAt', null, worker.getUpdatedDateTimeString(), ''),
    $contactsTD = newElement('td', 'workers-table__list-contacts', null, ''),
    $contactsTDWrap = newElement('div', 'workers-table__list-contacts-wrap', null, ''),
    $btnActionsTD = newElement('td', 'workers-table__list-actions', null, ''),

    $btnChange = newElement('button', 'workers-table__list-btn-change btn', null, 'Изменить', { 'data-btn': 'change' }),
    $btnChangeSvg = newElement('svg', 'workers-table__list-btn-change-svg', null),
    $btnChangeSvgPreloader = newElement('svg', 'workers-table__list-btn-change-svg-preloader', null),


    $btnDelete = newElement('button', 'workers-table__list-btn-delete btn', null, 'Удалить', { 'data-btn': 'delete' }),
    $btnCloseSvg = newElement('svg', 'workers-table__list-btn-close-svg', null),
    $btnCloseSvgPreloader = newElement('svg', 'workers-table__list-btn-close-svg-preloader', null)


  // * Вставка svg внурь кнопок
  $btnChange.prepend($btnChangeSvg)
  $btnChange.prepend($btnChangeSvgPreloader)

  $btnDelete.prepend($btnCloseSvg)
  $btnDelete.prepend($btnCloseSvgPreloader)


  $contactsTD.prepend($contactsTDWrap)

  $workerTr.append($idTD, $fioTD, $createdAtTD, $updatedAtTD, $contactsTD, $btnActionsTD, $btnActionsTD)

  $createdAtTD.append($createdSpan)
  $updatedAtTD.append($updatedSpan)


  // * Oбрезаем id в строке работника при адаптиве
  const idValue = $idTD.innerHTML

  if (window.innerWidth > 1440) {
    $idTD.innerHTML = idValue
  } else {
    $idTD.innerHTML = idValue.substring(0, 5)
  }


  // * Создаем иконки в контактах
  function addIconsCount() {

    let $iconTelBtn, $iconEmailBtn, $iconVKBtn, $iconFBBtn, $iconUserBtn

    worker.contacts.forEach((contact, index) => {


      function checkIcons($iconBtn, createIcon) {

        $iconBtn.insertAdjacentHTML('beforeEnd', createIcon())

        if (index <= 3) {
          $contactsTDWrap.append($iconBtn)
        } else {
          $contactsTDWrap.append($iconBtn)
          $iconBtn.classList.add('hidden')
        }
      }


      if (contact.type === 'Телефон') {
        $iconTelBtn = newElement('button', 'workers-table__list-contact-btn tooltip-js btn', null, null, { 'data-tippy-content': `Телефон: ${contact.value}`, 'aria-label': 'true' })
        checkIcons($iconTelBtn, createTelIcon)
      }

      if (contact.type === 'Email') {
        $iconEmailBtn = newElement('button', 'workers-table__list-contact-btn tooltip-js btn', null, null, { 'data-tippy-content': `Email: ${contact.value}`, 'aria-label': 'true' })
        checkIcons($iconEmailBtn, createEmailIcon)
      }


      if (contact.type === 'VK') {
        $iconVKBtn = newElement('button', 'workers-table__list-contact-btn tooltip-js btn', null, null, { 'data-tippy-content': `VK: ${contact.value}`, 'aria-label': 'true' })
        checkIcons($iconVKBtn, createVKIcon)
      }


      if (contact.type === 'Facebook') {
        $iconFBBtn = newElement('button', 'workers-table__list-contact-btn tooltip-js btn', null, null, { 'data-tippy-content': `FB: ${contact.value}`, 'aria-label': 'true' })
        checkIcons($iconFBBtn, createFBIcon)
      }


      if (contact.type === 'Другое') {
        $iconUserBtn = newElement('button', 'workers-table__list-contact-btn tooltip-js btn', null, null, { 'data-tippy-content': `Другое: ${contact.value}`, 'aria-label': 'true' })
        checkIcons($iconUserBtn, createUserIcon)
      }
    })


    // * Находим скрытые иконки
    let hiddenIcons = $contactsTDWrap.querySelectorAll('.hidden')


    // * Добавление кнопки-счетчика
    const workerContactsLength = worker.contacts.length

    if (workerContactsLength >= 3 && hiddenIcons.length !== 0) {
      const $iconBtn = newElement('button', 'workers-table__list-contact-btn-more btn', null, null)
      const $iconBtnText = newElement('span', 'workers-table__list-contact-btn-more-text', null, null)

      $iconBtnText.textContent = '+' + hiddenIcons.length

      $iconBtn.append($iconBtnText)
      $contactsTDWrap.append($iconBtn)


      // * Отображение остальных контактов по клику на кнопку - счетчик 
      $iconBtn.addEventListener('click', () => {
        $iconBtn.remove()

        hiddenIcons = $contactsTDWrap.querySelectorAll('.hidden')

        hiddenIcons.forEach(icon => {
          icon.classList.remove('hidden')
        })

        tooltip()
      })
    }
  }

  addIconsCount()


  $btnActionsTD.append($btnChange)
  $btnActionsTD.append($btnDelete)

  return $workerTr
}


// ! =============================== добавление работника ======================================

// * Cоздаем кнопку удаления
const $addBtnWorker = newElement('button', 'add-worker btn', 'add-worker', 'Добавить клиента', '')

document.getElementById('container').append($addBtnWorker)

const popupNewWorker = document.getElementById('popup-new-worker')
const $popupNewWorkerForm = popupNewWorker.querySelector('#popup-form')


// * Функция добавления нового работника
function addNewWorker() {
  $popupNewWorkerForm.removeEventListener('submit', postWorker)
  popupNewWorkerOpen()
  $popupNewWorkerForm.addEventListener('submit', postWorker)
}

document.getElementById('add-worker').addEventListener('click', addNewWorker)


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
    const clientData = parseFormData($popupNewWorkerForm)


    // * Отправляем работника на сервер
    const serverDataObj = await serverAddWorkers(clientData)

    // * Обновляем массив
    if (serverDataObj) {
      workersArray.push(new Worker(
        serverDataObj.id,
        serverDataObj.name,
        serverDataObj.surname,
        serverDataObj.lastName,
        serverDataObj.createdAt,
        serverDataObj.updatedAt,
        serverDataObj.contacts,
      ))


      render(workersArray)
      popupNewWorkerClose()
    }
  }
}



// ! ===================== удаление работника по кнопке из таблицы ==========================
export const $popupDeleteBtn = document.getElementById('popup-delete-btn')
let workerID
export let $targetIcon
export let $targetIconPreload

// * Клик по кнопке удалить в таблице
$workersList.addEventListener('click', (event) => {
  if (event.target.getAttribute('data-btn') === 'delete') {

    popupDeleteWorkerOpen()

    const $btnDelete = event.target
    const $workerTR = $btnDelete.closest('tr')
    workerID = $workerTR.querySelector('.workers-table__list-id').textContent


    // * Определяем локально элемент прелоадера в кнопке
    $targetIcon = $workerTR.querySelector('.workers-table__list-btn-close-svg')
    $targetIconPreload = $workerTR.querySelector('.workers-table__list-btn-close-svg-preloader')


    $popupDeleteBtn.addEventListener('click', deleteWorker)
  }
})



// * Функция удаления работника из таблицы
export async function deleteWorker() {

  popupDeleteWorkerOpen()

  await serverDeleteWorkers(workerID)

  workersArray = workersArray.filter(function (item) {
    return item.id !== workerID
  })

  render(workersArray)

  popupDeleteWorkerClose()

  $popupDeleteBtn.removeEventListener('click', deleteWorker)
}

// ! ======================================== поиск ============================================

function debounce(fn, ms) {
  let timeout

  return function () {
    const fnCall = () => { fn.apply(this, arguments) }
    clearTimeout(timeout)
    timeout = setTimeout(fnCall, ms)
  }
}


// * Регулярное выражение
function getOptions(word, workers) {

  const regex = new RegExp(word, 'gi')

  const filteredWorkers = workers.filter(worker => {
    return (
      worker.name.match(regex) ||
      worker.surname.match(regex) ||
      worker.lastName.match(regex))

  })

  return filteredWorkers
}


let searchValueInput

// * Получаем конкретного работника из сервера (поле поиска)
async function serverGetWorkerSearch() {
  searchValueInput = document.getElementById('header-search').value
  const response = await fetch(`http://localhost:3000/api/clients/?search=${searchValueInput}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json()
  return data
}


// * Реализация через запрос к серверу
async function processData() {
  const searchData = await serverGetWorkerSearch()


  const currentElement = document.querySelectorAll('.workers-table__list-fio')


  currentElement.forEach(el => {
    if (searchValueInput.trim() !== '' && searchData.length > 0) {
      const fio = el.textContent
      const regex = new RegExp(searchValueInput, 'gi')
      const highlightedFio = fio.replace(
        regex,
        match => `<span class="color-search-item">${match}</span>`
      )
      el.innerHTML = `<td class="workers-table__list-fio">${highlightedFio}</td>`
    } else {
      el.innerHTML = `<td class="workers-table__list-fio">${el.textContent}</td>`
    }
  })


  const workersArraySearch = searchData.map(item => new Worker(
    item.id,
    item.name,
    item.surname,
    item.lastName,
    item.createdAt,
    item.updatedAt,
    item.contacts
  ))


  const optionsArr = getOptions(searchValueInput, workersArraySearch)


  const html = optionsArr.map(worker => {
    const regex = new RegExp(searchValueInput, 'gi')
    const workerName = worker.fio.replace(
      regex,
      `<span class="color-search-item">${searchValueInput}</span>`
    )
    return `<li><a href="#${worker.id}" class="yakor"><span>${workerName}</span></a></li>`
  }).slice(0, 10).join('')
}


// * Создаем автодополнение
let list // переменная списка

async function searchList() {

  // * Запрос массива по подстроке
  const searchData = await serverGetWorkerSearch()

  let inputSearchWrap = document.querySelector('.header__form')
  let inputSearch = document.querySelectorAll('.header__form-input')

  // * Создание списка
  if (!list) {
    list = document.createElement('ul')
    list.classList.add('header-search-list')
    inputSearchWrap.appendChild(list)
  }


  inputSearch.forEach(input => {

    // * Преобразование массива в класс, чтобы иметь доступ к сеттерам и геттерам
    const workersArraySearch = searchData.map(item => new Worker(
      item.id,
      item.name,
      item.surname,
      item.lastName,
      item.createdAt,
      item.updatedAt,
      item.contacts
    ))


    // * Создание массива на основе значения инпута
    const optionsArr = getOptions(searchValueInput, workersArraySearch)

    // * Создание разметки ноды на основе точного совпадения строк
    const html = optionsArr.map(worker => {

      const regex = new RegExp(searchValueInput, 'gi')
      const workerName = worker.fio.replace(
        regex,
        `<span class="color-search-item">${searchValueInput}</span>`
      )

      return `<li ><a href="#${worker.id}" class="yakor"><span>${workerName}</span></a></li>`

    }).slice(0, 10).join('')


    // * Добавление найденных совпадений в список
    if (searchValueInput && optionsArr.length > 0) {
      list.innerHTML = html
    } else {
      list.innerHTML = ''
    }
  })


  // * Якоря
  const searchListItems = document.querySelectorAll('.header-search-list a')
  searchListItems.forEach(item => {
    item.addEventListener('click', () => {
      item.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  })


  // * Анимация якорей
  document.querySelectorAll('.header-search-list a.yakor').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault()

      const href = this.getAttribute('href').substring(1)
      const scrollTarget = document.getElementById(href)
      const topOffset = 0
      const elementPosition = scrollTarget.getBoundingClientRect().top
      const offsetPosition = elementPosition - topOffset

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      })
    })
  })
}


// * Совпадения в самой таблице
const debounceSearchValue = debounce(processData, 300)
document.getElementById('header-search').addEventListener('keyup', debounceSearchValue)



// * Создание самого списка
const debounceSearchValueList = debounce(searchList, 300)
document.getElementById('header-search').addEventListener('keyup', debounceSearchValueList)




// ! ======================================= сортировка =========================================
function sort() {
  let column = 'id',
    columnDir = true


  // * Функция сортировки массива
  function getSortWorkers(arr, prop, dir) {
    return arr.sort(function (workerA, workerB) {
      let dirIf = dir == false ? workerA[prop] < workerB[prop] : workerA[prop] > workerB[prop]
      if (dirIf == true) return - 1
    })
  }


  //* Параметры сортировки
  function getSortWorkersOptions() {
    const $ArraySortWorkers = [...document.querySelectorAll('th')]

    $ArraySortWorkers.slice(0, -2).forEach(element => {
      element.addEventListener('click', function (event) {
        column = this.dataset.column
        columnDir = !columnDir
        event.currentTarget.classList.toggle('active')
        workersArray = getSortWorkers(workersArray, column, columnDir)

        render(workersArray)
      })
    })
  }

  getSortWorkersOptions()


  // * Обработка Я-А,  А-Я в ФИО
  function toggleLetter() {
    // * создаем переменные для сортировки(поле сортировки по умолчанию + направление)
    const fioData = document.querySelector('[data-column="fio"]')
    const $fioDataSpan = document.querySelector('.workers-table__fio span')

    fioData.addEventListener('click', () => {
      if (fioData.classList.contains('active')) {
        $fioDataSpan.textContent = "Я-А"
      } else {
        $fioDataSpan.textContent = "А-Я"
      }
    })
  }

  toggleLetter()


  workersArray = getSortWorkers(workersArray, column, columnDir)
}

sort()


// ! ========================================= рендер ===========================================
export function render(workersArray) {

  $workersList.innerHTML = ''


  for (const worker of workersArray) {
    $workersList.append(newWorkerTR(worker))
  }


  tooltip()

}

render(workersArray)