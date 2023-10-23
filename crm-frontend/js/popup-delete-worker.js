import { newElement } from './popup-add-worker.js'
import { deleteWorker } from './main.js'

const bodyScrollLock = document.body


//*================ функция создания разметки попапа нового работника ====================
function popupDeleteWorker() {

  const closePopupBtn = `
  <svg width="17" height="17" viewbox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
      d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z"
      fill="#B0B0B0" />
  </svg>`


  const popupDeleteWorker = newElement({
    tag: 'div',
    params: {
      classList: ['popup'],
      id: 'popup-delete-worker',
    },
    parent: document.body
  })

  const popupBody = newElement({
    tag: 'div',
    params: {
      classList: ['popup__body'],
    },
    parent: popupDeleteWorker
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
      classList: ['popup__title', 'popup__title-mod'],
      textContent: 'Удалить клиента',
    },
    parent: popupWrap
  })

  const popupSubTitle = newElement({
    tag: 'h3',
    params: {
      classList: ['popup__subtitle'],
      textContent: 'Вы действительно хотите удалить данного клиента?',
    },
    parent: popupWrap
  })

  const popupBtn = newElement({
    tag: 'button',
    params: {
      classList: ['popup__close', 'btn'],
      id: 'popup-delete-user-close',
      innerHTML: closePopupBtn,
    },
    parent: popupWrap
  })



  //*==========================Кнопки сохранить, отмена==============================

  const popupBtnSave = newElement({
    tag: 'button',
    params: {
      classList: ['popup__button-save', 'btn'],
      id: 'popup-delete-btn',
      textContent: 'Удалить',
      type: 'submit',
    },
    parent: popupWrap
  })

  const popupBtnChanel = newElement({
    tag: 'button',
    params: {
      classList: ['popup__button-del', 'btn'],
      id: 'popup-delete-chanel-btn',
      textContent: 'Отмена',
    },
    parent: popupWrap
  })
}
popupDeleteWorker()


//*===============================Обработчики событий=====================================

const popupDeleteWorkerId = document.getElementById('popup-delete-worker')


//*=========================== закрытие попапа по кнопкам =================================
const closeBtnArr = ['popup-delete-chanel-btn', 'popup-delete-user-close']

function popupCloseButtons() {
  popupDeleteWorkerClose()
}

//*============================= закрытие попапа по ESC ===================================
function popupCloseESC(e) {
  if (e.which === 27) {
    popupDeleteWorkerClose()
  }
}

//*==================== закрытие попапа по клику в пустой области =========================
function popupCloseArea(event) {
  if (!event.target.closest('.popup__wrap')&& event.buttons === 1) {
    popupDeleteWorkerClose()
  }
}


//*==================== итоговые функции закрытия/открытия попапов ========================
export function popupDeleteWorkerOpen() {
  if (!popupDeleteWorkerId.classList.contains('open')) {
    bodyScrollLock.classList.add('body', 'lock')
    popupDeleteWorkerId.classList.add('open')
  }


  document.addEventListener('keydown', popupCloseESC)
  popupDeleteWorkerId.addEventListener('mousedown', popupCloseArea)

  closeBtnArr.forEach(item => {
    document.getElementById(item).addEventListener('click', popupCloseButtons)
  })

}




export function popupDeleteWorkerClose() {
  if (popupDeleteWorkerId.classList.contains('open')) {
    bodyScrollLock.classList.remove('body', 'lock')
    popupDeleteWorkerId.classList.remove('open')
  }


  document.removeEventListener('keydown', popupCloseESC)

  popupDeleteWorkerId.removeEventListener('mousedown', popupCloseArea)

  closeBtnArr.forEach(item => {
    document.getElementById(item).removeEventListener('click', popupCloseButtons)
  })


  const $popupDeleteBtn = document.getElementById('popup-delete-btn')

  $popupDeleteBtn.removeEventListener('click', deleteWorker)
}