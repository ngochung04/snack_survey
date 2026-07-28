<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ink' | 'ghost' | 'sage' | 'yellow' | 'blue' | 'pink' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  shape?: 'pill' | 'rounded' | 'square' | 'sharp'
  disabled?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  size: 'md',
  shape: 'pill',
  disabled: false,
  block: false,
  type: 'button'
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-1.5 whitespace-nowrap select-none cursor-pointer font-mono font-extrabold uppercase tracking-[.06em] border-[2px] border-ink transition-[transform,box-shadow] duration-75 hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-40 disabled:cursor-default disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-none"
    :class="[
      variant === 'primary' && 'bg-terracotta text-ink shadow-[3px_3px_0_0_rgba(28,25,23,0.8)]',
      variant === 'secondary' && 'bg-cream text-ink shadow-[3px_3px_0_0_rgba(28,25,23,0.8)]',
      variant === 'ink' && 'bg-ink text-cream shadow-[3px_3px_0_0_rgba(28,25,23,0.8)]',
      variant === 'ghost' && 'bg-transparent text-ink border-ink/40 shadow-none',
      variant === 'sage' && 'bg-sage text-ink shadow-[3px_3px_0_0_rgba(28,25,23,0.8)]',
      variant === 'yellow' && 'bg-retro-yellow text-ink shadow-[3px_3px_0_0_rgba(28,25,23,0.8)]',
      variant === 'blue' && 'bg-retro-blue text-ink shadow-[3px_3px_0_0_rgba(28,25,23,0.8)]',
      variant === 'pink' && 'bg-retro-pink text-ink shadow-[3px_3px_0_0_rgba(28,25,23,0.8)]',
      variant === 'danger' && 'bg-retro-pink text-ink shadow-[3px_3px_0_0_rgba(28,25,23,0.8)]',
      size === 'xs' && 'text-[9px] px-2.5 py-1',
      size === 'sm' && 'text-[10px] px-3.5 py-1.5',
      size === 'md' && 'text-[11px] px-5 py-2.5',
      size === 'lg' && 'text-[13px] px-8 py-3.5',
      size === 'xl' && 'text-[14px] px-10 py-4',
      size === 'icon' && 'text-[11px] w-9 h-9 p-0',
      shape === 'pill' && 'rounded-full',
      shape === 'rounded' && 'rounded-xl',
      shape === 'square' && 'rounded-lg',
      shape === 'sharp' && 'rounded-none',
      block && 'w-full'
    ]"
  >
    <slot />
  </button>
</template>
