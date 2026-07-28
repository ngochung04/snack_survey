<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'dot' | 'elevatedDot' | 'solid' | 'interactive'
}>(), {
  variant: 'default'
})
</script>

<template>
  <div
    class="border-[2px] border-ink rounded-2xl p-5 transition-[transform,box-shadow] duration-75 relative overflow-hidden"
    :class="[
      variant === 'default' && 'bg-surface shadow-neo',
      variant === 'dot' && 'bg-surface shadow-neo',
      variant === 'elevatedDot' && 'bg-surface shadow-neo-lg',
      variant === 'solid' && 'bg-cream shadow-neo',
      variant === 'interactive' && 'bg-surface shadow-neo hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer'
    ]"
  >
    <slot />
  </div>
</template>
