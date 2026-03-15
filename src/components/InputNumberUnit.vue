<script setup lang="ts">
    import { computed } from "vue";

    const unit = defineModel<string>('unit');
    const value = defineModel<number>('value');

    const {unitList, disabled} = defineProps<{
        unitList?: string[]
        disabled?: boolean
        step?: number
        min?: number
        max?: number
    }>();

    const maxOptionLength = computed<number>(() => {
        return unitList?.reduce((prev, curr) => Math.max(prev, curr.length), 0) ?? 0;
    })
</script>

<template>
    <span class="inline-flex border border-secondary rounded">
        <input
            style="appearance: textfield"
            type="number"
            :min
            :max
            :step
            class="input input-sm border-0 focus:outline-0 h-7.5 grow"
            :disabled
            v-model="value"
        />

        <select
            v-if="unitList && unitList.length"
            :disabled
            v-model="unit"
            :style="{minWidth: `calc(44px + ${maxOptionLength}ch)`}"
            class="w-auto select select-sm text-end border-0 focus:outline-0 pe-8 h-7.5 bg-secondary/15 rounded-none"
        >
            <option v-for="item in unitList" :value="item">{{ item }}</option>
        </select>

        <span v-else-if="unit" class="px-6 py-1.5 text-end h-7.5 bg-secondary/15 select-none">
            {{ unit }}
        </span>
    </span>
</template>