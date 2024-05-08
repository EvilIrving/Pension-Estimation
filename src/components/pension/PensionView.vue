<template>
    <div class="flex m-4">
        <section class="flex-1  px-4">
            <h2 class="text-xl mb-4 font-bold text-center">
                养老金计算器
                <!-- <icon class="" name="info-circle" size="medium" /> -->
            </h2>
            <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" class="px-8" :size="formSize"
                status-icon>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="formData.age" />
                </el-form-item>
                <el-form-item label="性别" prop="retirementAge">
                    <el-radio-group v-model="formData.retirementAge">
                        <el-radio :value="60">男</el-radio>
                        <el-radio :value="55">女</el-radio>
                    </el-radio-group>
                    <span class="px-4">
                        退休年龄: {{ formData.retirementAge }}
                    </span>

                </el-form-item>
                <el-form-item label="以前实际缴费的年限" name="actualContributedYears">
                    <el-input v-model.number="formData.actualContributedYears" clearable>
                        <template #suffix> 年 </template>
                    </el-input>
                </el-form-item>
                <!-- 职工工资 -->
                <el-form-item label="公司为你申报的缴纳基数" prop="baseWage">
                    <el-input v-model.number="formData.baseWage" clearable @change="rateChange"> <template #suffix> 元
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="工资增长率" prop="wageGrowth">
                    <el-input v-model.number="formData.wageGrowth" clearable :formatter="formatInput"
                        :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="企业缴费比例" prop="enterpriseRate">
                    <el-input v-model.number="formData.enterpriseRate" clearable @change="rateChange"
                        :formatter="formatInput" :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="个人缴费比例" prop="individualRate">
                    <el-input v-model.number="formData.individualRate" clearable @change="rateChange"
                        :formatter="formatInput" :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="月缴费额(自动)" prop="monthlyContribution">
                    <el-input disabled v-model.number="formData.monthlyContribution" clearable> <template #suffix> 元
                        </template>
                    </el-input> </el-form-item>
                <el-form-item label="参保地上一年社会月平均工资" prop="averageSocialWage">
                    <el-input v-model.number="formData.averageSocialWage" clearable> <template #suffix> 元
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="社会月平均工资增长率" prop="averageSocialWageGrowth">
                    <el-input v-model.number="formData.averageSocialWageGrowth" clearable :formatter="formatInput"
                        :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="个人账户余额" prop="balance">
                    <el-input v-model.number="formData.balance" clearable> <template #suffix> 元
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="个人账户记账利率" prop="personalRate">
                    <el-input v-model.number="formData.personalRate" clearable :formatter="formatInput"
                        :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="resetForm(formRef)">重置</el-button>
                    <el-button type="primary" @click="submitForm(formRef)">计算</el-button>
                </el-form-item>
            </el-form>

        </section>
        <section class="flex-1">
            <section class="text-sm text-left">
                <h3 class="text-lg font-bold">计算方式：</h3>
                <h3 class="text-base font-bold my-3">你能领到的养老金就是个人账户和统筹账户加起来的数额</h3>
                <h4 class="text-sm font-bold">退休后每个月个人账户领到的钱：</h4>
                <p class="my-3">（缴纳基数 * 8% * 缴纳年数 + 这些钱在这些年的利息）/ 计发月份</p>

                <h4 class="text-sm font-bold">退休后每个月统筹账户领到的钱：</h4>
                <p class="my-3">申领养老金时上年度全市职工月平均工资 * （1 + 月平均缴费工资指数）/ 2 * 缴纳年数 * 1%</p>
                <p class="text-xs">其中月平均缴费工资指数是: 几十年来, (每个月缴纳工资基数 / 上年度社会月平均工资) 的累加 / 累计月数 </p>
                <!-- <h4>注意：上述数据均为预期账面数值，并未考虑通货膨胀因素。</h4> -->

                <div>
                    <p class="text-xs mt-3">公式来源: <a class="text-blue-500 hover:text-blue-400"
                            href="https://www.shanghai.gov.cn/newshanghai/xxgkfj/hff1770.pdf">https://www.shanghai.gov.cn/newshanghai/xxgkfj/hff1770.pdf</a>
                    </p>
                </div>


            </section>
            <el-card shadow="never" class="mt-8">
                <el-divider class="my-3">养老金预算结果</el-divider>
                <section v-show="isCalculated" class="text-left text-green-500">
                    <h3 class="text-lg font-bold">养老金预算结果：</h3>
                    <h4 class="text-sm font-bold">退休年份：{{ pensions.retire_year }}年</h4>
                    <!-- <h4>退休时个人养老金账户余额为：{{ pensions.pension }}</h4> -->
                    <h4 class="text-sm font-bold">退休后每月大致能拿：{{ pensions.pension }}元(其中基础养老金{{ pensions.basePension
                        }}元,个人养老金{{
                pensions.personalPension }}元)
                    </h4>
                    <h4 class="text-sm font-bold"> 退休后社会平均工资为：{{ pensions.averageWageLastYearWhenRetire }}元</h4>
                    <h4 class="text-sm font-bold">退休后养老金约等于上一年社会平均工资的{{ pensions.factor }}%</h4>
                </section>
            </el-card>

        </section>
    </div>

</template>

<script setup>
import Pension from './model'
import { validate } from '@/utils/index'
import { ref, reactive, toRefs, onMounted } from 'vue'
import { Default_Data } from './constant';
import { VuePDF, usePDF } from '@tato30/vue-pdf' // https://tato30.github.io/vue-pdf/guide/introduction.html

onMounted(() => {
    calc_month_contribution(Default_Data.baseWage, Default_Data.enterpriseRate, Default_Data.individualRate)
})
const formSize = 'large'
let formRef = ref(undefined)
let formData = reactive({ ...Default_Data })
const rules = reactive({
    age: [{ required: true, message: '年龄必填' }],
    retirementAge: [{ required: true, message: '退休年龄必填' }],
    // actualContributedYears: [{ required: true, message: '以前实际缴费的年限必填', type: 'error' }],
    baseWage: [{ required: true, message: '缴纳基数必填' }],
    // wageGrowth: [{ required: true, message: '工资增长率必填' }],
    // enterpriseRate: [{ required: true, message: '企业缴纳比例必填' }],
    // individualRate: [{ required: true, message: '个人缴纳比例必填' }],
    averageSocialWage: [{ required: true, message: '上年度社会月平均工资必填' }],
    // averageSocialWageGrowth: [{ required: true, message: '社会月平均工资增长率必填' }],
    // balance: [{ required: true, message: '个人账户余额必填' }],
    // personalRate: [{ required: true, message: '个人账户利率必填' }],
})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            calculate()
        } else {
            console.log('error submit!!')
        }
    })
}
let pensions = reactive({})
let isCalculated = ref(false)

const resetForm = (formEl) => {
    isCalculated.value = false
    if (!formEl) return
    formEl.resetFields()
    pensions = reactive({})
}
// 计算
function calculate() {
    isCalculated.value = false
    // 验证数据合法性, 创建验证器函数，将验证函数作为参数传递给它
    const validator = validate(validatePensionYears, validateAge);
    const validationResult = validator(formData.actualContributedYears, formData.balance, formData.age, formData.retirementAge);
    if (!validationResult.success) {
        ElMessage({
            message: validationResult.msg,
            type: 'warning',
        })
        return;
    }

    // 计算养老金
    const model = new Pension(toRefs(formData))
    isCalculated.value = true
    pensions = reactive(model.calculate())
}

// 验证缴纳年限和余额
function validatePensionYears(actualContributedYears, balance) {
    // 个人账户当前余额需大于或等于0
    if (balance && balance < 0) return { success: false, msg: '个人账户当前余额需大于或等于0' }

    // 有余额就存在缴纳年限
    if (!actualContributedYears) {
        return {
            success: false,
            msg: '如果以前没有缴纳年限, 则个人账户需为空',
        }
    }

    // 年龄 - 以前缴纳年份 <= 18 不能上班
    let startWorkAge = formData.age - formData.actualContributedYears
    if (startWorkAge <= 18) {
        return {
            success: false,
            msg: `${startWorkAge}岁开始打工吗?，你填错了！`
        }
    }

    return { success: true }
}

/**
 * @description 验证年龄合法性
 * @param {*} actualContributedYears 实际缴纳年限
 * @param {*} retirementAge 退休年龄
 * @param {*} age 年纪
 */
function validateAge(actualContributedYears, retirementAge, age) {
    const result = { success: true, msg: '' }
    if (age < 18) return { success: false, msg: '你不要去上班!' }

    if ((actualContributedYears + retirementAge - age) < 15) {
        result.success = false
        result.msg = '总缴费年限不满15年，不能按月领取养老金！'
    }
    return result
}

// 缴纳费率变化时, 计算月缴费额
function rateChange() {
    calc_month_contribution(formData.baseWage, formData.enterpriseRate, formData.individualRate)
}

// 格式化保存的数据
function parserInput(value) {
    return value / 100
}

/**
 * @description 格式化展示出来的数据
 * @param {*} value 
 */
function formatInput(value) {
    return (value * 100).toFixed(0)
}

/**
 * 
 * @param {*} wage 缴费工资
 * @param {*} enterprise 企业缴纳比例
 * @param {*} individual 个人缴纳比例
 */
function calc_month_contribution(wage, enterprise, individual) {
    formData.monthlyContribution = (wage * (enterprise + individual)).toFixed(2)
}

// const showPopup = ref(false)
// const pdfUrl = ref('your_pdf_file.pdf')
// function togglePopup(flag) {
//     showPopup.value = flag;
// }


const { pdf } = usePDF('sample.pdf')
</script>

<style>
.pdf-link {
    position: relative;
    display: inline-block;
    color: blue;
    text-decoration: none;
}

.pdf-link:hover::after {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid blue;
    border-radius: 5px;
}

.pdf-popup {
    position: fixed;
    top: 40px;
    left: 20px;
    z-index: 999;
    width: 500px;
    height: 500px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>