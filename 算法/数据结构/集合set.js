// 集合
const set = new Set();
set.add(1);
set.add(2);
set.add(3);
set.add(4);
set.add(5);
set.add(5);
console.log(set); // Set { 1, 2, 3, 4, 5 }
console.log(set.has(5)); // true
console.log(set.size); // 5
set.delete(5);
console.log(set); // Set { 1, 2, 3, 4 }
set.clear();
console.log(set); // Set {}

// 集合常见操作 并集交集差集
const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([4, 5, 6, 7, 8]);

// 并集
const union = new Set([...set1, ...set2]);
console.log(union); // Set { 1, 2, 3, 4, 5, 6, 7, 8 }

// 交集
const intersect = new Set([...set1].filter(item => set2.has(item)));
console.log(intersect); // Set { 4, 5 }

// 差集
const difference = new Set([...set1].filter(item => !set2.has(item)));
console.log(difference); // Set { 1, 2, 3 }

// Map
const map = new Map();
map.set('a', 'aa');
map.set('b', 'bb');
map.set('c', 'cc');
console.log(map); // Map { 'a' => 'aa', 'b' => 'bb', 'c' => 'cc' }

console.log(map.get('a')); // aa
console.log(map.has('a')); // true
console.log(map.size); // 3
map.delete('a');
console.log(map); // Map { 'b' => 'bb', 'c' => 'cc' }
map.clear();
console.log(map); // Map {}

// 一般情况下，使用数组的概率会比集合概率高很多

// 使用set集合的场景一般是借助其确定性，其本身只包含不同的元素

// 所以，可以利用Set的一些原生方法轻松的完成数组去重，查找数组公共元素及不同元素等操作


