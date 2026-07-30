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
    <label v-if="label" class="theme-label block text-ink mb-1.5">
      {{ label }}
    </label>
    <textarea
      v-if="type === 'textarea'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="theme-control w-full font-sans text-sm text-ink px-4 py-2.5 outline-none transition-shadow duration-100 placeholder:text-subtle min-h-[80px] resize-vertical"
      :class="[
        state === 'default' && 'focus:[box-shadow:var(--elev-2)]',
        state === 'valid' && '!border-sage focus:[box-shadow:var(--elev-2)]',
        state === 'error' && '!border-terracotta focus:[box-shadow:var(--elev-2)]'
      ]"
    />
    <input
      v-else
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="theme-control w-full font-sans text-sm text-ink px-4 outline-none transition-shadow duration-100 placeholder:text-subtle"
      :class="[
        compact ? 'py-1.5' : 'py-2.5',
        state === 'default' && 'focus:[box-shadow:var(--elev-2)]',
        state === 'valid' && '!border-sage focus:[box-shadow:var(--elev-2)]',
        state === 'error' && '!border-terracotta focus:[box-shadow:var(--elev-2)]'
      ]"
    />
  </div>
</template>
