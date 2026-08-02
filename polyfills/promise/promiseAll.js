const customPromiseAll = promises => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('PromiseAll expects an array'));
    }

    const result = [];
    let pending = promises.length;

    if (pending === 0) {
      return resolve(result);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          result[index] = value;
          pending--;

          if (pending === 0) {
            resolve(result);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  });
};


// invoke customPromiseAll
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error('Something went wrong'));
const promise3 = Promise.resolve(3);
const promises = [promise1, promise2, promise3];

customPromiseAll(promises)
  .then(value => {
    console.log(value);
  })
  .catch(err => {
    console.error('Rejected:', err.message);
  });
