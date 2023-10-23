import { $targetIcon, $targetIconPreload } from './main.js'
import { $targetChangeIcon, $targetChangeIconPreload } from './popup-change-worker.js'

export const SERVER_URL = 'http://localhost:3000'
export let errorMessage


// * Получаем стартовый список работников из сервера
export async function serverGetWorkers() {

  // * Создаем элемент прелоадера
  const spinner = document.querySelector('.spinner')
  const table = document.querySelector('.workers-table')


  const response = await fetch(SERVER_URL + '/api/clients', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })


  const data = await response.json()


  if (response.ok) {

    // * Удаляем прелоадер
    spinner.remove()

    // * Показываем таблицу
    table.style.display = 'table'

    return data
  }

  if (!response.ok) {
    spinner.remove()
    throw new Error(`Ошибка получения работников: ${response.status}`)
  }
}


// * Добавляем работника на сервер
export async function serverAddWorkers(obj) {

  const response = await fetch(SERVER_URL + '/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })


  const data = await response.json()

  if (response.ok) {
    return data
  }


  if (!response.ok) {

    // * Удаление сообщения об ошибке
    if (errorMessage) {
      errorMessage.remove()
    }


    // * Создаем элемент ошибки 
    errorMessage = document.createElement('p')
    errorMessage.classList.add('error-server-message')


    if (response.status === 422) {

      let errorMessages = ''

      data.errors.forEach((error) => {
        if (error.field === 'name') {
          errorMessages += 'Ошибка добавления работника: Введите имя\n'
        } else if (error.field === 'surname') {
          errorMessages += 'Ошибка добавления работника: Введите фамилию\n'
        }
      })

      errorMessage.textContent = errorMessages

    } else {
      errorMessage.textContent = `Что-то пошло не так... `
    }


    const btnSave = document.querySelector('#popup-new-save-worker')
    btnSave.before(errorMessage)
    btnSave.style.marginTop = '0px'

  }
}


// * Удаляем работника из сервера
export async function serverDeleteWorkers(id) {

  // * Меняем элемент прелоадера в кнопке
  if ($targetIcon !== undefined) {
    $targetIcon.style.display = 'none'
    $targetIconPreload.style.display = 'block'
  }

  const response = await fetch(SERVER_URL + '/api/clients/' + id, {
    method: 'DELETE',
  })


  const data = await response.json()


  if (response.ok) {
    return data
  }


  if (!response.ok) {
    // * Меняем элемент прелоадера в кнопке
    $targetIcon.style.display = 'block'
    $targetIconPreload.style.display = 'none'

    throw new Error(`Ошибка удаления работника: ${response.status}`)
  }
}



// * Получаем конкретного работника из сервера
export async function serverGetWorker(id) {

  const response = await fetch(SERVER_URL + '/api/clients/' + id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })


  const data = await response.json()


  if (response.ok) {
    return data
  }

  if (!response.ok) {
    throw new Error(`Ошибка получения работника: ${response.status}`)
  }

}



// * Изменяем работника на сервере
export async function serverPatchWorkers(id, obj) {

  // * Прелоадер в кнопке попапа
  const spinnerButton = document.querySelectorAll('.spinner-save-btn')

  spinnerButton.forEach(icon => {
    icon.style.display = 'block'
  })


  // * Меняем элемент прелоадера в кнопке
  if ($targetChangeIcon !== undefined && $targetChangeIconPreload !== undefined) {
    $targetChangeIcon.style.display = 'none'
    $targetChangeIconPreload.style.display = 'block'
  }


  const response = await fetch(SERVER_URL + '/api/clients/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  })


  const data = await response.json()


  if (response.ok) {
    // * Удаляем прелоадер в кнопке попапа
    spinnerButton.forEach(icon => {
      icon.style.display = 'none'
    })


    return data
  }

  if (!response.ok) {

    // * Удаление сообщения об ошибке
    if (errorMessage) {
      errorMessage.remove()
    }

    // * Создаем элемент ошибки 
    errorMessage = document.createElement('p')
    errorMessage.classList.add('error-server-message')


    if (response.status === 404) {
      errorMessage.textContent = `Запрашиваемый элемент не найден: ${response.status}`
    } else if (response.status === 422) {
      errorMessage.textContent = `Ошибка изменения работника: Заполните все поля`
    } else {
      errorMessage.textContent = `Что-то пошло не так... `
    }


    const btnSave = document.querySelector('#popup-change-save-worker')
    btnSave.before(errorMessage)
    btnSave.style.marginTop = '0px'
  }
}