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
    class="inline-flex items-center justify-center gap-1.5 whitespace-nowrap select-none cursor-pointer font-mono font-extrabold uppercase tracking-[.06em] border-solid transition-[transform,box-shadow] duration-100 disabled:opacity-40 disabled:cursor-default disabled:transform-none disabled:shadow-none"
    :style="{
      borderWidth: 'var(--border-w)',
      borderColor: 'var(--stroke)',
      borderRadius: shape === 'sharp' ? '0' : shape === 'pill' ? 'var(--radius-btn)' : 'var(--radius-control)',
      boxShadow: variant === 'ghost' ? 'none' : 'var(--btn-shadow)'
    }"
    :class="[
      variant === 'primary' && 'bg-terracotta text-ink',
      variant === 'secondary' && 'bg-cream text-ink',
      variant === 'ink' && 'bg-ink text-cream',
      variant === 'ghost' && 'bg-transparent text-ink opacity-90',
      variant === 'sage' && 'bg-sage text-ink',
      variant === 'yellow' && 'bg-retro-yellow text-ink',
      variant === 'blue' && 'bg-retro-blue text-ink',
      variant === 'pink' && 'bg-retro-pink text-ink',
      variant === 'danger' && 'bg-retro-pink text-ink',
      size === 'xs' && 'text-[9px] px-2.5 py-1',
      size === 'sm' && 'text-[10px] px-3.5 py-1.5',
      size === 'md' && 'text-[11px] px-5 py-2.5',
      size === 'lg' && 'text-[13px] px-8 py-3.5',
      size === 'xl' && 'text-[14px] px-10 py-4',
      size === 'icon' && 'text-[11px] w-9 h-9 p-0',
      block && 'w-full',
      !disabled && 'hover:[transform:var(--press-hover)] hover:[box-shadow:var(--press-hover-shadow)] active:[transform:var(--press-active)] active:[box-shadow:var(--press-active-shadow)]'
    ]"
  >
    <slot />
  </button>
</template>
