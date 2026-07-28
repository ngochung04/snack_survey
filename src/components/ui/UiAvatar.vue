<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  src?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  src: '',
  fallback: '?',
  size: 'md'
})

const sizeClasses = computed(() => ({
  sm: 'w-7 h-7 text-[10px]',
  md: 'w-9 h-9 text-xs',
  lg: 'w-12 h-12 text-sm'
}[props.size]))

const initial = computed(() => props.fallback.charAt(0).toUpperCase())
</script>

<template>
  <div
    class="rounded-full border-[2px] border-ink overflow-hidden bg-retro-yellow inline-flex items-center justify-center font-mono font-black select-none shrink-0"
    :class="sizeClasses"
  >
    <img v-if="src" :src="src" :alt="fallback" class="w-full h-full object-cover" />
    <span v-else>{{ initial }}</span>
  </div>
</template>
