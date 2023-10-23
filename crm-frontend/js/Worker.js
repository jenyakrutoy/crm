export default

  // * Cоздание класса работника
  class Worker {
  constructor(id, name, surname, lastName, createdAt, updatedAt, contacts) {
    this.id = id
    this.name = name
    this.surname = surname
    this.lastName = lastName
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.contacts = contacts
  }


  // * Получаем ФИО
  set fio(value) {
    let strArr = value.split(' ')
    this.name = strArr[0]
    this.surname = strArr[1]
    this.lastName = strArr[2]
  }


  // * Получаем ФИО
  get fio() {
    return `${this.name} ${this.surname} ${this.lastName}`
  }


  // * Получаем дату создания
  set createdAt(value) {
    this._createdAt = value
  }


  // * Получаем дату создания
  get createdAt() {
    return this._createdAt
  }


  // * Получаем дату обновления
  set updatedAt(value) {
    this._updatedAt = value
  }


  // * Получаем дату обновления
  get updatedAt() {
    return this._updatedAt
  }


  // * Получаем дату создания в формате (dd-mm-yyyy)
  getCreateDateString() {
    const data = new Date(this.createdAt)
    const yyyy = data.getFullYear()

    let mm = data.getMonth() + 1
    let dd = data.getDate()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    return dd + '.' + mm + '.' + yyyy + ' '
  }


  // * Получаем дату создания в формате (mm-ss)
  getCreateDateTimeString() {
    const data = new Date(this.createdAt)

    let hh = data.getHours()
    let mi = data.getMinutes()

    if (hh < 10) hh = '0' + hh
    if (mi < 10) mi = '0' + mi

    return hh + ':' + mi
  }


  // * Получаем дату создания в формате (dd-mm-yyyy)
  getUpdatedDateString() {
    const data = new Date(this.updatedAt)
    const yyyy = data.getFullYear()

    let mm = data.getMonth() + 1
    let dd = data.getDate()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm


    return dd + '.' + mm + '.' + yyyy + ' '
  }


  // * Получаем возраст студента в формате (mm-ss)
  getUpdatedDateTimeString() {
    const data = new Date(this.updatedAt)

    let hh = data.getHours()
    let mi = data.getMinutes()

    if (hh < 10) hh = '0' + hh
    if (mi < 10) mi = '0' + mi

    return hh + ':' + mi
  }
}