# 退休金计算器

> 在 tuixiujin.site 使用我们的退休金计算器，计算退休时每月领取的养老金。

![退休金计算器](./src/assets/pension/jiemian.jpg)

想知道如何计算退休时每月领取的养老金吗？使用我们的退休金计算器，根据您的年龄、平均月收入、预计年平均工资增长率、企业缴费比例、个人缴费比例和预计退休年龄，轻松计算出您的养老金金额。

## 特性

- 简单易用：通过填写少量必要的信息，即可得到您的退休金计算结果。
- 准确可靠：基于您提供的数据和常用算法，计算器给出合理的退休金估算。

## 使用方法

1. 访问 [tuixiujin.site](https://tuixiujin.site/)。
2. 在计算器页面，输入您的年龄、平均月收入、预计年平均工资增长率、企业缴费比例、个人缴费比例和预计退休年龄。
3. 单击“计算”按钮，即可得到每月领取的养老金金额。

## 示例

```javascript
const age = 45;
const averageMonthlyIncome = 5000;
const wageGrowthRate = 3.5;
const employerContributionRate = 10;
const employeeContributionRate = 5;
const retirementAge = 65;

const retirementAmount = calculateRetirementAmount(age, averageMonthlyIncome, wageGrowthRate, employerContributionRate, employeeContributionRate, retirementAge);

console.log(`您预计退休时每月可领取的养老金金额为：${retirementAmount}元。`);
```

## 贡献

如有任何问题、建议或贡献，请通过提交问题或拉取请求来帮助改进此项目。

## 许可证

本项目使用 [MIT](https://github.com/your/repository/blob/main/LICENSE) 许可证。

---

感谢您使用退休金计算器！如需更多帮助，请访问 [tuixiujin.site](https://tuixiujin.site/)。