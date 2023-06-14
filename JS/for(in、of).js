Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};

let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); // logs 0, 1, 2, "foo"
  }
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}

// for in 遍历的是数组的索引（即键名），而 for of 遍历的是数组元素值。原型链上的属性也会被遍历出来。
// for of 遍历的只是数组内的元素，而不包括数组的原型属性 arrCustom 和 objCustom。

// for in 适合遍历对象，for of 适合遍历数组。
