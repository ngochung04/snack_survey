<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'dot' | 'elevatedDot' | 'solid' | 'interactive'
}>(), {
  variant: 'default'
})
</script>

<template>
  <div
    class="theme-panel p-5 transition-[transform,box-shadow] duration-100 relative"
    :class="[
      variant === 'solid' && '!bg-cream',
      variant === 'elevatedDot' && 'theme-panel-md !shadow-[var(--elev-3)]',
      variant === 'interactive' && 'cursor-pointer hover:[transform:var(--interactive-hover)] active:[transform:var(--interactive-active)] active:[box-shadow:var(--press-active-shadow)]'
    ]"
  >
    <slot />
  </div>
</template>
