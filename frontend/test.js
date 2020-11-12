Array.prototype.myForeach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};
[1, 2, 3, 4, 5, 6].myForeach((element, index, arr) => {
  console.log(arr);
});
