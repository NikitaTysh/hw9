import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';
console.log(Notify);

let selected = null;
let current = null
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const btn = document.querySelector('button[data-start]');
btn.setAttribute('disabled', '');

btn.addEventListener('click', showTime);
const opt = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    current = currentDate.getTime();
    selected = selectedDates[0].getTime();
    if (selected < current) {
        days.innerHTML = '00'
        hours.innerHTML = '00'
        minutes.innerHTML = '00'
        seconds.innerHTML = '00'
        Notify.failure('Please choose a date in the future');
      
    } else btn.removeAttribute('disabled');
  },
};
flatpickr('#datetime-picker', opt);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = String(Math.floor(ms / day)).padStart(2,'0');
  const hours = String(Math.floor((ms % day) / hour)).padStart(2,'0');
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2,'0');
  const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2,'0');
  return { days, hours, minutes, seconds };
}

function showTime() {
  if (selected < current) {
    return;
   
  }
  const currentDate = new Date();
    current = currentDate.getTime();
    const obj = convertMs(selected - current);
    days.innerHTML = obj.days;
    hours.innerHTML = obj.hours;
    minutes.innerHTML = obj.minutes;
    seconds.innerHTML = obj.seconds;
const id = setInterval(() => {
    const currentDate = new Date();
    current = currentDate.getTime();
    const obj = convertMs(selected - current);
    if (selected <= current) {
   clearInterval(id)
    return
      }
      days.innerHTML = obj.days;
      hours.innerHTML = obj.hours;
      minutes.innerHTML = obj.minutes;
      seconds.innerHTML = obj.seconds;
      console.log(current , selected);
}, 1000);
}
