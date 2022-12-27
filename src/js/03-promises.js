import { Notify } from 'notiflix';
Notify.success('lib ok');
console.log('ok');
const btn = document.querySelector('.form button');
const amount = document.querySelector('.form input[name="amount"]');
const step = document.querySelector('.form input[name="step"]');
const firstDelay = document.querySelector('.form input[name="delay"]');
btn.addEventListener('click', onClick);
function onClick(e) {
  let count = +firstDelay.value;
  e.preventDefault();
  for (let i = 0; i < +amount.value; i += 1) {
    createPromise(i + 1, count);
    count += +step.value;
    console.log(count);
  }
}
function createPromise(position, delay) {
  const promise = new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        res(Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        rej(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
  return promise;
}
