<script setup lang="ts">
defineProps<{
  modelValue: string
  tabs: { value: string; label: string }[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div
    class="flex gap-2 p-1.5 bg-surface flex-wrap"
    :style="{
      borderWidth: 'var(--border-w)',
      borderStyle: 'solid',
      borderColor: 'var(--stroke)',
      borderRadius: 'var(--radius-card)'
    }"
  >
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="font-mono font-bold text-[11px] uppercase tracking-[.06em] px-4 py-2 cursor-pointer transition-[transform,box-shadow,colors] duration-100 select-none"
      :style="{
        borderRadius: 'var(--radius-control)',
        borderWidth: modelValue === tab.value ? '0' : 'var(--border-w)',
        borderStyle: 'solid',
        borderColor: 'var(--stroke)',
        boxShadow: modelValue === tab.value ? 'var(--elev-0)' : 'none'
      }"
      :class="modelValue === tab.value
        ? 'bg-ink text-cream'
        : 'bg-surface text-ink hover:bg-cream'"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
