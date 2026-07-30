<script setup lang="ts">
import { computed } from 'vue'
import useTheme from '@/core/hooks/useTheme'
import type { ThemeId } from '@/core/theme/themes'
import UiSelect from './UiSelect.vue'

const { theme, themes, themeOptions, setTheme } = useTheme()

const currentLabel = computed(
  () => themes.value.find((t) => t.id === theme.value)?.label ?? theme.value
)

const onUpdate = (value: string) => {
  setTheme(value as ThemeId)
}
</script>

<template>
  <div
    class="theme-switcher group theme-panel bg-surface/95 backdrop-blur-sm overflow-hidden transition-[width,padding,box-shadow] duration-200 ease-out w-11 h-11 p-0 hover:w-[180px] hover:h-auto hover:p-2.5 focus-within:w-[180px] focus-within:h-auto focus-within:p-2.5 shadow-[var(--elev-2)]"
  >
    <!-- Compact: icon only -->
    <div
      class="flex items-center justify-center w-11 h-11 group-hover:hidden group-focus-within:hidden"
      :title="currentLabel"
    >
      <i
        class="mdi mdi-palette text-xl text-ink -ml-1"
        :class="theme === 'stall' && '-mt-3'"
      />
    </div>

    <!-- Full: select -->
    <div class="hidden group-hover:block group-focus-within:block min-w-[150px]">
      <UiSelect
        :model-value="theme"
        :options="themeOptions"
        label="Theme"
        compact
        @update:model-value="onUpdate"
      />
    </div>
  </div>
</template>
