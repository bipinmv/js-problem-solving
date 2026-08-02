const customPromiseAllSettled = promises => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('PromiseAllSettled expects an array'));
    }

    const result = [];
    let pending = promises.length;

    if (pending === 0) {
      return resolve(result);
    }

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          result[index] = {
            status: 'fulfilled',
            value
          };
        })
        .catch(reason => {
          result[index] = {
            status: 'rejected',
            reason
          };
        })
        .finally(() => {
          pending--;
          if (pending === 0) {
            resolve(result);
          }
        });
    });
  });
};

// invoke customPromiseAllSettled
const promise1 = Promise.resolve(1);
const promise2 = Promise.reject(new Error('Something went wrong'));
const promise3 = Promise.resolve(3);
const promises = [promise1, promise2, promise3];

customPromiseAllSettled(promises).then(results => {
  console.log(results);
});
