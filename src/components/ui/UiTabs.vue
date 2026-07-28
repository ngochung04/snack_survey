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
  <div class="flex gap-2 p-1.5 bg-surface border-[2px] border-ink rounded-2xl flex-wrap">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="font-mono font-bold text-[11px] uppercase tracking-[.06em] px-4 py-2 rounded-xl cursor-pointer transition-colors duration-75 select-none"
      :class="modelValue === tab.value
        ? 'bg-ink text-cream shadow-[2px_2px_0_0_rgba(28,25,23,1)]'
        : 'bg-surface text-ink border-[2px] border-ink hover:bg-cream hover:shadow-[2px_2px_0_0_rgba(28,25,23,1)]'"
      @click="emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
