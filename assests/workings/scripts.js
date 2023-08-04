const calendar = document.querySelector('.calendar'),
  date = document.querySelector('.date'),
  daysContainer = document.querySelector('.days'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  gotoBtn = document.querySelector('.goto-btn'),
  todayBtn = document.querySelector('.today-btn'),
  dateInput = document.querySelector('.date-input')

let today = new Date()
let activeDay
let month = today.getMonth()
let year = today.getFullYear()

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//function to add days

function initCalendar() {
  // get prev month days, all current month days and next month days to display

  const firstDay = new Date(year, month, 1),
    lastDay = new Date(year, month + 1, 0),
    prevLastDay = new Date(year, month, 0),
    prevDays = prevLastDay.getDate(),
    lastDate = lastDay.getDate(),
    day = firstDay.getDay(),
    nextDays = 7 - lastDay.getDay() - 1

  // console.log('day: ' + day + ' lastDate: ' + lastDate + ' prevDate: ' + prevDays + ' prevLastDate: ' + prevLastDay + ' lastDay: ' + lastDay + ' firstDay: ' + firstDay)
  console.log('month: ' + month + ' year: ' + year)

  //update data top of calendar
  date.innerHTML = months[month] + ' ' + year

  //add days on dom
  let days = ''
  //prev month
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`
    // console.log('prev-days: ' + days)
  }

  //current month days

  for (let i = 1; i <= lastDate; i++) {
    //if day is today then add class today

    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      days += `<div class="day today">${i}</div>`
      // console.log('TRUE: ' + i)
    }

    //add remaining as it is
    else {
      days += `<div class="day">${i}</div>`
    }
  }
  //next months days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`
  }
  // console.log(days)
  daysContainer.innerHTML = days
}

initCalendar()

//previous month

function prevMonth() {
  month--
  if (month < 0) {
    month = 11
    year--
  }
  initCalendar()
}

//next month

function nextMonth() {
  month++
  if (month > 11) {
    month = 0
    year++
  }
  initCalendar()
}

prev.addEventListener('click', prevMonth)
next.addEventListener('click', nextMonth)

//goto date functionality and Today function

todayBtn.addEventListener('click', () => {
  today = new Date()
  month = today.getMonth()
  year = today.getFullYear()
  initCalendar()
})

dateInput.addEventListener('keyup', (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, '')
  if (dateInput.value.length === 2) {
    dateInput.value += '/'
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7)
  }
  //if we remove until slash its not removing

  if ((e.inputType = 'deleteContentBackward')) {
    if (dateInput.value.length === 7) {
      dateInput.value = dateInput.value.slice(0, 7)
    }
  }
  console.log(dateInput.value)
})

gotoBtn.addEventListener('click', gotoDate)

//funtion to go to the entered date

function gotoDate() {
  const dateArr = dateInput.value.split('/')
  console.log(dateArr)
  // some date validation
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1
      year = dateArr[1]
      console.log(month + year)
      initCalendar()
      return
    }
  } else {
    alert('invalid date')
  }
}
