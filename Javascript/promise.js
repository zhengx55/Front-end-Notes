const myPromise = new Promise(function (resolve, reject) {
  if (Math.random() >= 0.5) {
    resolve("Promise fulfilled!! You win🇩🇪");
  } else {
    reject("Promise rejected !! You Lose");
  }
});

myPromise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
