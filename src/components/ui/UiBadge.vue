<script setup lang="ts">
withDefaults(defineProps<{
  color?: 'terracotta' | 'sage' | 'yellow' | 'blue' | 'pink' | 'purple' | 'cream' | 'ink'
  dot?: boolean
}>(), {
  color: 'terracotta',
  dot: false
})
</script>

<template>
  <span
    class="theme-chip inline-flex items-center gap-1 text-[10px] uppercase px-2.5 py-0.5"
    :class="[
      color === 'terracotta' && 'bg-terracotta text-ink',
      color === 'sage' && 'bg-sage text-ink',
      color === 'yellow' && 'bg-retro-yellow text-ink',
      color === 'blue' && 'bg-retro-blue text-ink',
      color === 'pink' && 'bg-retro-pink text-ink',
      color === 'purple' && 'bg-retro-purple text-ink',
      color === 'cream' && 'bg-cream text-ink',
      color === 'ink' && 'bg-ink text-cream'
    ]"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full bg-ink animate-pulse" />
    <slot />
  </span>
</template>
