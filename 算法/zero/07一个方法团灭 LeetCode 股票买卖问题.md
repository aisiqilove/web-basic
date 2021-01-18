## 07 一个方法团灭 LeetCode 股票买卖问题

* 本文拒绝奇技淫巧，而是稳扎稳打，只用一种通用方法解决所用问题，以不变应万变

用状态机的技巧来解决，可以全部提交通过。不要觉得这个名词高大上，文学词汇而已，实际上就是 DP table，看一眼就明白了。**动态规划**

回忆02动规穷举（循环）特点：
**重叠子问题**
**具有最优子结构**
**状态转移方程**

明确base case -》 明确状态 -》 明确选择 -》 dp数组/函数

``` c++

// base case
dp[0][0][...] = base

for 状态1 in 状态1的所有取值：

    for 状态2 in 状态2的所有取值：
        for ...
            dp[状态1][状态2][...] = 求最值(选择1，选择2...)

``` 

* 套用框架：

1. 每天都有三种「选择」：买入、卖出、无操作

2. 每天有三个「状态」： 第几天、允许交易最大次数、是否持有股票( 1 表示持有，0 表示没有持有）)、

我们想求的最终答案是 dp[n - 1][K][0]，即最后一天，最多允许 K 次交易，最多获得多少利润。

```

dp[i][k][0 or 1]
0 <= i <= n-1, 1 <= k <= K
n 为天数，大 K 为最多交易数
此问题共 n × K × 2 种状态，全部穷举就能搞定。

for 0 <= i < n:

    for 1 <= k <= K:
        for s in {0, 1}:
            dp[i][k][s] = max(buy, sell, rest)

下面是动态规划中最困难的一步：状态转移方程。

dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])

解释：今天没有持有股票，有两种可能： 1. 我昨天页面没有持有 2. 我昨天持有，今天shell 所以今天没有持有股票

dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])

解释： 今天持有股票，有两种可能： 1. 我昨天持有股票，今天也没卖 2. 我昨天没有持有，今天 buy (交易次数k-1) 今天持有

base case：

dp[-1][k][0] = 0
解释：因为 i 是从 0 开始的，所以 i = -1 意味着还没有开始，这时候的利润当然是 0 。
dp[-1][k][1] = -Infinity
解释：还没开始的时候，是不可能持有股票的，用负无穷表示这种不可能。
dp[i][0][0] = 0
解释：因为 k 是从 1 开始的，所以 k = 0 意味着根本不允许交易，这时候利润当然是 0 。
dp[i][0][1] = -Infinity
解释：不允许交易的情况下，是不可能持有股票的，用负无穷表示这种不可能。

``` 

### 买卖股票的最佳时机

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。

``` js

// k 始终是1 k-1 = 0 dp[i-1][0][0] = 0
var maxProfit = function(prices) {
  const n = prices.length
  // var rest = new Array(2).fill(0)
  // var dp = new Array(n).fill(rest)
  let dp_i_0 = 0, dp_i_1 = -Infinity
  for(let i = 0; i < n; i++) {
    
    // 这样处理 base case 很麻烦，而且注意一下状态转移方程，新状态只和相邻的一个状态有关，其实不用整个 dp 数组，只需要一个变量储存相邻的那个状态就足够了，这样可以把空间复杂度降到 O(1):
    // if(i-1 == -1) {
    //   dp[i][0] = 0
    //   dp[i][1] = -prices[i]
    //   continue
    // }
    // dp[i][0] = Math.max(dp[i-1][0], dp[i-1][1] + prices[i])
    // dp[i][1] = Math.max(dp[i-1][1], -prices[i])

    dp_i_0 = Math.max(dp_i_0, dp_i_1 +  prices[i])
    dp_i_1 = Math.max(dp_i_1, -prices[i])
  }

  // return dp[n-1][0]

  return dp_i_0

};

```

### 买卖股票的最佳时机 II

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

``` js
// k = +Infinity k - 1 和 k 没有区别 
// dp[i][0] = Math.max(dp[i][0], dp[i-1][1] + prices[i])
// dp[i-1][1] = Math.max(dp[i-1][1], dp[i-1][0] - prices[i])

var maxProfit = function(prices) {
    const n = prices.length
    let dp_i_0 = 0,
        dp_i_1 = -Infinity
    for (let i = 0; i < n; i++) {
        var temp = dp_i_0
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
        dp_i_1 = Math.max(dp_i_1, temp - prices[i])
    }
    return dp_i_0
}
```

### 买卖股票的最佳时机含手续费

给定一个整数数组 prices，其中第 i 个元素代表了第 i 天的股票价格 ；非负整数 fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

``` js
// k = +Infinity 且每次交易减去fee就可以了
var maxProfit = function(prices, fee) {
    const n = prices.length
    let dp_i_0 = 0,
        dp_i_1 = -Infinity
    for (let i = 0; i < n; i++) {
        var temp = dp_i_0
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
        dp_i_1 = Math.max(dp_i_1, temp - prices[i] - fee)

    }

    return dp_i_0
};
```

### 最佳买卖股票时机含冷冻期

给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​

卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。

``` js
// 加上冷冻期 i-1 改成 i-2
// dp[i][1] = Math.max(dp[i][1], dp[i-2][0] - prices[i])  
var maxProfit = function(prices) {
    const n = prices.length
    let dp_i_0 = 0,
        dp_i_1 = -Infinity,
        dp_pre_0 = 0
    for (let i = 0; i < n; i++) {
        var temp = dp_i_0
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
        dp_i_1 = Math.max(dp_i_1, dp_pre_0 - prices[i])
        dp_pre_0 = temp
    }

    return dp_i_0
};
```

### 买卖股票的最佳时机 III

给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

``` js
// var ka = new Array(k).fill(0)
// var dp = new Array(n).fill(rest)
var maxProfit = function(prices) {
    const n = prices.length
    if (n == 0) {
        return 0;
    }
    var max_k = 2

    let dp = Array.from(new Array(n), () => new Array(max_k + 1));
    for (let i = 0; i < n; i++) {
        for (let r = 0; r <= max_k; r++) {
            dp[i][r] = new Array(2).fill(0);
        }
    }
    for (let i = 0; i < n; i++) {
        for (var k = max_k; k >= 1; k--) {
            if (i - 1 == -1) {
                dp[i][k][0] = 0
                dp[i][k][1] = -prices[i]
                continue
            }
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
        }
    }

    return dp[n - 1][max_k][0]

};
```

### 买卖股票的最佳时机 IV

给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。

``` js
var maxProfit = function(k, prices) {
    const n = prices.length
    if (n == 0) {
        return 0;
    }
    var max_k = k
    // 当k无限大时 dp会造成内存泄漏 而k 最大只能时n的 一半 买卖交易需要2天完成
    if (max_k > n / 2) {
        max_k = Math.floor(n / 2)
    };
    let dp = Array.from(new Array(n), () => new Array(max_k + 1));
    for (let i = 0; i < n; i++) {
        for (let r = 0; r <= max_k; r++) {
            dp[i][r] = new Array(2).fill(0);
        }
    }
    for (let i = 0; i < n; i++) {
        for (var k = max_k; k >= 1; k--) {
            if (i - 1 == -1) {
                dp[i][k][0] = 0
                dp[i][k][1] = -prices[i]
                continue
            }
            dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
            dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
        }
    }

    return dp[n - 1][max_k][0]

};
```
