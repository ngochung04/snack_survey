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
    class="theme-panel flex items-center gap-3 px-4 py-3 font-sans text-sm font-semibold text-ink !shadow-[var(--elev-0)]"
    :class="[
      type === 'info' && '!bg-retro-blue',
      type === 'success' && '!bg-sage',
      type === 'warning' && '!bg-retro-yellow',
      type === 'error' && '!bg-retro-pink'
    ]"
  >
    <span>{{ message }}</span>
  </div>
</template>
