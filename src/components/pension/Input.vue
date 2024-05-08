<template>
    <section>
        <el-form-item :label="label" :prop="propName">
            <el-input v-model.number="formData.wageGrowth" clearable placeholder="" :formatter="formatInput"
                :parser="parserInput">
                <template #suffix> {{ suffix }}
                </template>
            </el-input>
        </el-form-item>
    </section>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: ''
    },
    propName: {
        type: String,
        default: ''
    },
    attrs: {
        type: Object,
        default: () => ({
            clearable: true,
            placeholder: '',
            formatter: (value) => value + '%',
            parser: (value) => value.replace('%', '')
        })
    },
    suffix: {
        type: String,
        default: ''
    }
})


</script>