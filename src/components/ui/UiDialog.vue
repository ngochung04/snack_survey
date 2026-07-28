<script setup lang="ts">
defineProps<{
  modelValue: boolean
  title?: string
  maxWidth?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const close = () => emit('update:modelValue', false)
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="bg-ink/40 fixed inset-0" @click="close" />
        <div
          class="relative w-full bg-cream border-[3px] border-ink rounded-3xl shadow-neo-2xl overflow-hidden focus:outline-none"
          :class="maxWidth || 'max-w-lg'"
        >
          <div class="max-h-[85vh] overflow-y-auto p-6">
            <div v-if="$slots.title || title" class="font-serif font-black text-2xl text-ink mb-4">
              <slot name="title">{{ title }}</slot>
            </div>
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-enter-active, .dialog-leave-active {
  transition: opacity 150ms ease;
}
.dialog-enter-from, .dialog-leave-to {
  opacity: 0;
}
</style>
