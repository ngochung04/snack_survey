<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string
  label?: string
  type?: 'text' | 'textarea'
  placeholder?: string
  state?: 'default' | 'valid' | 'error'
  compact?: boolean
}>(), {
  modelValue: '',
  type: 'text',
  state: 'default',
  compact: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <label v-if="label" class="block font-mono font-black text-[10px] uppercase tracking-[.1em] text-ink mb-1.5">
      {{ label }}
    </label>
    <textarea
      v-if="type === 'textarea'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="w-full font-sans text-sm text-ink bg-surface border-[2px] border-ink rounded-xl px-4 py-2.5 outline-none transition-shadow duration-100 placeholder:text-subtle min-h-[80px] resize-vertical"
      :class="[
        state === 'default' && 'shadow-neo focus:shadow-neo-md',
        state === 'valid' && 'border-sage shadow-[2px_2px_0_0_rgba(129,178,154,0.8)] focus:shadow-[3px_3px_0_0_rgba(129,178,154,0.8)]',
        state === 'error' && 'border-terracotta shadow-[2px_2px_0_0_rgba(224,122,95,0.8)] focus:shadow-[3px_3px_0_0_rgba(224,122,95,0.8)]'
      ]"
    />
    <input
      v-else
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="w-full font-sans text-sm text-ink bg-surface border-[2px] border-ink rounded-xl px-4 outline-none transition-shadow duration-100 placeholder:text-subtle"
      :class="[
        compact ? 'py-1.5' : 'py-2.5',
        state === 'default' && 'shadow-neo focus:shadow-neo-md',
        state === 'valid' && 'border-sage shadow-[2px_2px_0_0_rgba(129,178,154,0.8)] focus:shadow-[3px_3px_0_0_rgba(129,178,154,0.8)]',
        state === 'error' && 'border-terracotta shadow-[2px_2px_0_0_rgba(224,122,95,0.8)] focus:shadow-[3px_3px_0_0_rgba(224,122,95,0.8)]'
      ]"
    />
  </div>
</template>
