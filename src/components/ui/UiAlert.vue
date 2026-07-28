<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'info' | 'success' | 'warning' | 'error'
  message: string
}>(), {
  type: 'info'
})
</script>

<template>
  <div
    class="flex items-center gap-3 px-4 py-3 rounded-2xl border-[2px] border-ink shadow-neo-sm font-sans text-sm font-semibold text-ink"
    :class="[
      type === 'info' && 'bg-retro-blue',
      type === 'success' && 'bg-sage',
      type === 'warning' && 'bg-retro-yellow',
      type === 'error' && 'bg-retro-pink'
    ]"
  >
    <span>{{ message }}</span>
  </div>
</template>
