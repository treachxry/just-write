<script setup lang="ts">
    const value = defineModel<boolean>();

    defineOptions({
        inheritAttrs: false
    });
</script>

<template>
    <label class="label">
        <input type="checkbox" class="checkbox checkbox-secondary checkbox-xs" v-model="value" v-bind="$attrs"/>
        <span class="select-none">
            <slot/>
        </span>
    </label>
</template>