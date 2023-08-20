const calendar = document.querySelector('.calendar'),
  date = document.querySelector('.date'),
  daysContainer = document.querySelector('.days'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  gotoBtn = document.querySelector('.goto-btn'),
  todayBtn = document.querySelector('.today-btn'),
  dateInput = document.querySelector('.date-input'),
  eventDay = document.querySelector('.event-day'),
  eventDate = document.querySelector('.event-date'),
  eventsContainer = document.querySelector('.events')

let today = new Date()
let activeDay
let month = today.getMonth()
let year = today.getFullYear()

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//default eventsArr
const eventsArr = [
  {
    day: 21,
    month: 8,
    year: 2023,
    events: [
      {
        title: 'Swimming',
        time: '10:30 AM',
      },
      {
        title: 'Cut the grass',
        time: '11:00 AM',
      },
    ],
  },
  {
    day: 30,
    month: 8,
    year: 2023,
    events: [
      {
        title: 'Walk the dog',
        time: '10:00 AM',
      },
      {
        title: 'Paint the Shed',
        time: '11:00 AM',
      },
    ],
  },
  {
    day: 13,
    month: 9,
    year: 2023,
    events: [
      {
        title: 'Walk the dog',
        time: '10:00 AM',
      },
      {
        title: 'Cut the grass',
        time: '11:00 AM',
      },
    ],
  },
]

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
    //checkif events present on current day

    let event = false
    eventsArr.forEach((eventObj) => {
      if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
        event = true
      }
    })

    //if day is today then add class today

    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      activeDay = i
      getActiveDay(i)
      updateEvents(i)
      //if event is found add event class
      if (event) {
        days += `<div class="day event active today">${i}</div>`
      } else {
        days += `<div class="day active today">${i}</div>`
      }
    }

    //add remaining as it is
    else {
      if (event) {
        days += `<div class="day event">${i}</div>`
      } else {
        days += `<div class="day">${i}</div>`
      }
    }
  }
  //next months days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`
  }
  // console.log(days)
  daysContainer.innerHTML = days
  //add listener after calendar initalised
  addListener()
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
  console.log('dateValue' + dateInput.value)
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
      console.log('month ' + month + 'year ' + year)
      initCalendar()
      return
    }
  } else {
    alert('invalid date')
  }
}

const addEventBtn = document.querySelector('.add-event-btn'),
  addEventContainer = document.querySelector('.add-event-wrapper'),
  addEventCloseBtn = document.querySelector('.close'),
  addEventTitle = document.querySelector('#input-event-name'),
  addEventFrom = document.querySelector('#input-event-from'),
  addEventTo = document.querySelector('#input-event-to'),
  addEventWhere = document.querySelector('#input-event-venue'),
  addEventType = document.querySelector('#input-event-type')

addEventBtn.addEventListener('click', () => {
  addEventContainer.classList.toggle('active')
})
addEventCloseBtn.addEventListener('click', () => {
  addEventContainer.classList.remove('active')
})

document.addEventListener('click', (e) => {
  if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove('active')
  }
})

//allow only 50 char in title
addEventTitle.addEventListener('input', (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 50)
})

//time format in from and to time fields
addEventFrom.addEventListener('input', (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '')
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ':'
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5)
  }
})

addEventTo.addEventListener('input', (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '')
  if (addEventTo.value.length === 2) {
    addEventTo.value += ':'
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5)
  }
})

//create a funtion to add listener on days after rendered

function addListener() {
  const days = document.querySelectorAll('.day')
  days.forEach((day) => {
    day.addEventListener('click', (e) => {
      //set current day as active day
      activeDay = Number(e.target.innerHTML)
      getActiveDay(e.target.innerHTML)
      updateEvents(Number(e.target.innerHTML))

      //remove active from already active day
      days.forEach((day) => {
        day.classList.remove('active')
      })

      //if prev month day clicked goto prev month and add active

      if (e.target.classList.contains('prev-date')) {
        prevMonth()

        setTimeout(() => {
          //select alll days of that month
          const days = document.querySelectorAll('.day')

          //after going to previous month add active to click
          days.forEach((day) => {
            if (!day.classList.contains('prev-date') && day.innerHTML === e.target.innerHTML) {
              day.classList.add('active')
            }
          })
        }, 100)
      }
      //same with next months days
      else if (e.target.classList.contains('next-date')) {
        nextMonth()
        setTimeout(() => {
          //select alll days of that month
          const days = document.querySelectorAll('.day')

          //after going to previous month add active to click
          days.forEach((day) => {
            if (!day.classList.contains('next-date') && day.innerHTML === e.target.innerHTML) {
              day.classList.add('active')
            }
          })
        }, 100)
      } else {
        //remaining current month days
        e.target.classList.add('active')
      }
    })
  })
}

//lets show active day events and date at top

function getActiveDay(date) {
  const day = new Date(year, month, date)
  const dayName = day.toString().split(' ')[0]
  console.log('day: ' + day + ' dayName: ' + dayName)
  eventDay.innerHTML = dayName
  eventDate.innerHTML = date + ' ' + months[month] + ' ' + year
}

//function to show the events of that day

function updateEvents(date) {
  // console.log('Update date: ' + date + ' month: ' + month + ' year: ' + year)
  let events = ''
  // console.log(eventsArr)
  eventsArr.forEach((event) => {
    //get events of active day only
    if (date === event.day && month + 1 === event.month && year === event.year) {
      console.log(event.day)
      //then show event on document
      event.events.forEach((event) => {
        events += `
        <div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">${event.time}</div>
          </div>`
        console.log('Events for today: ' + event)
      })
    }
  })
  //if nothing found
  if (events === '') {
    events = `
          <div class = "no-event">
          <h3>No events today</h3>
          </div>
        `
    console.log('No events for today: ')
  }
  console.log('events for today processed: ')
  eventsContainer.innerHTML = events
  saveEvents()
}

function saveEvents() {
  localStorage.setItem('events', JSON.stringify(eventsArr))
}
