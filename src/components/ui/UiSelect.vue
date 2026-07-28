<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string
  options: Array<{ value: string; label: string } | { label: string; options: Array<{ value: string; label: string }> }>
  placeholder?: string
  label?: string
  state?: 'default' | 'valid' | 'error'
  compact?: boolean
}>(), {
  modelValue: '',
  state: 'default',
  compact: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <label v-if="label" class="block font-mono font-black text-[10px] uppercase tracking-[.1em] text-ink mb-1.5">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      @change="onChange"
      class="w-full font-sans text-sm text-ink bg-surface border-[2px] border-ink rounded-xl px-4 outline-none transition-shadow duration-100 appearance-none cursor-pointer"
      :class="[
        compact ? 'py-1.5' : 'py-2.5',
        state === 'default' && 'shadow-neo focus:shadow-neo-md',
        state === 'valid' && 'border-sage shadow-[2px_2px_0_0_rgba(129,178,154,0.8)] focus:shadow-[3px_3px_0_0_rgba(129,178,154,0.8)]',
        state === 'error' && 'border-terracotta shadow-[2px_2px_0_0_rgba(224,122,95,0.8)] focus:shadow-[3px_3px_0_0_rgba(224,122,95,0.8)]'
      ]"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <template v-for="option in options" :key="'value' in option ? option.value : option.label">
        <optgroup v-if="'options' in option" :label="option.label">
          <option
            v-for="child in option.options"
            :key="child.value"
            :value="child.value"
          >
            {{ child.label }}
          </option>
        </optgroup>
        <option v-else :value="option.value">
          {{ option.label }}
        </option>
      </template>
    </select>
  </div>
</template>
