const customPromiseAny = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('PromiseAny expects an array'));
    }
    if (promises.length === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }

    const errors = [];
    let pending = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          resolve(value);
        })
        .catch((e) => {
          pending--;
          errors[index] = e;
          if (pending === 0) {
            reject(new AggregateError(errors));
          }
        });
    });
  });
};

// invoke customPromiseAny
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error('Something went wrong'));
const promise3 = Promise.resolve(3);
const promises = [promise1, promise2, promise3];

customPromiseAny(promises)
  .then((value) => {
    console.log(value);
  })
  .catch((err) => {
    console.error('Rejected:', err.errors);
  });
