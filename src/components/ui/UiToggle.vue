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
      class="relative w-12 h-6 rounded-full border-[2px] border-ink transition-colors duration-150"
      :class="modelValue ? 'bg-terracotta' : 'bg-stone-200'"
      @click="emit('update:modelValue', !modelValue)"
    >
      <div
        class="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-ink transition-transform duration-150"
        :class="modelValue ? 'translate-x-6' : 'translate-x-0.5'"
      />
    </div>
    <span v-if="label" class="font-sans text-sm text-ink font-medium">{{ label }}</span>
  </label>
</template>
