// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

//////////////////////////////////////////////////////

const form = document.querySelector('.form');

/////////////////////////////////////////////////////

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const state = event.target.elements.state.value,
    delay = +event.target.elements.delay.value;

  // Create promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  // Registering promise callbacks
  promise
    .then(value => {
      iziToast.success({
        message: `${value}`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        message: `${error}`,
        position: 'topRight',
      });
    });

  form.reset();
}
