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
    class="inline-flex items-center gap-1 font-mono font-black text-[10px] uppercase tracking-[.08em] border-[2px] border-ink rounded-full px-2.5 py-0.5"
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
