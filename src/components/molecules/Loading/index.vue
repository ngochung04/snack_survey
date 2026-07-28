<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div v-if="isLoading" class="fixed inset-0 bg-ink/50 flex items-center justify-center z-50">
    <div class="font-serif font-black text-3xl tracking-wider text-cream">
      Loading...
    </div>
  </div>
</template>
