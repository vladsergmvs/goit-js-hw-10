// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

//////////////////////////////////////////////////////////////

const startTimerBtn = document.querySelector('button[data-start]'),
      allValuesContainerTimer = document.querySelectorAll('.timer .value'),
       inputDate = document.querySelector('#datetime-picker');
  

//////////////////////////////////////////////////////////////
let userSelectedDate;
startTimerBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    userSelectedDate >= Date.now() ? (startTimerBtn.disabled = false) : iziToast.error({
          title: 'Error',
          message: 'Please choose a date in the future',
        });
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startTimerBtn.addEventListener('click', event => {
  startTimerBtn.disabled = true;
  inputDate.disabled = true;
  let RemainingTime = 0;

  const timerInterval = setInterval(() => {
    RemainingTime = convertMs(userSelectedDate - Date.now());
    for (let i = 0; i < allValuesContainerTimer.length; i++) {
      allValuesContainerTimer[i].textContent = String(
        Object.values(RemainingTime)[i]
      ).padStart(2, '0');
    }

    if (userSelectedDate - Date.now() <= 0) {
      clearInterval(timerInterval);
      document.querySelector('#datetime-picker').disabled = false;
      for (let i = 0; i < allValuesContainerTimer.length; i++) {
        allValuesContainerTimer[i].textContent = '00';
      }
      iziToast.success({
        title: 'Done',
        message: 'The countdown has finished!',
      });
    }
  }, 1000);
});
