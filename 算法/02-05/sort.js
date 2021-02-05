var arr = [1, 2, 11, 12, 3, 4, 23, 5, 8, 7]

//  冒泡
function bubbleSort (arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
}

// 插入
function insertionSort (arr) {
  let len = arr.length
  let index, current
  for (let i = 1; i < len; i++) {
    index = i - 1
    current = arr[i]

    while (index >= 0 && arr[index] > current) {
      arr[index + 1] = arr[index]
      index--
    }
    arr[index + 1] = current
  }

}

// 选择
function selectionSort (arr) {
  let len = arr.length
  let index, temp
  for (let i = 0; i < len - 1; i++) {
    index = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[index]) {
        index = j
      }
    }
    temp = arr[i]
    arr[i] = arr[index]
    arr[index] = temp
  }
}
selectionSort(arr)

console.log(arr)