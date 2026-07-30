<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="inline-flex items-center gap-3 cursor-pointer select-none">
    <div
      class="relative w-12 h-6 transition-colors duration-150"
      :class="modelValue ? 'bg-terracotta' : 'bg-stone-200'"
      :style="{
        borderWidth: 'var(--border-w)',
        borderStyle: 'solid',
        borderColor: 'var(--stroke)',
        borderRadius: 'var(--radius-btn)'
      }"
      @click="emit('update:modelValue', !modelValue)"
    >
      <div
        class="absolute top-0.5 w-3.5 h-3.5 bg-ink transition-transform duration-150"
        :class="modelValue ? 'translate-x-6' : 'translate-x-0.5'"
        :style="{ borderRadius: 'var(--radius-btn)' }"
      />
    </div>
    <span v-if="label" class="font-sans text-sm text-ink font-medium">{{ label }}</span>
  </label>
</template>
