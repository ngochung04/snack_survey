/**
 * Attentive: only use hook in file *.vue
 */

import { computed, ref } from 'vue'
import { applyTheme, getStoredTheme, persistTheme } from '@/core/theme/applyTheme'
import { DEFAULT_THEME, THEMES, type ThemeId } from '@/core/theme/themes'

const theme = ref<ThemeId>(DEFAULT_THEME)
let initialized = false

function ensureInit() {
  if (initialized) return
  theme.value = getStoredTheme()
  applyTheme(theme.value)
  initialized = true
}

const useTheme = () => {
  ensureInit()

  const themes = computed(() => THEMES)
  const themeOptions = computed(() =>
    THEMES.map((t) => ({ value: t.id, label: t.label }))
  )

  const setTheme = (next: ThemeId) => {
    theme.value = next
    applyTheme(next)
    persistTheme(next)
  }

  return {
    theme,
    themes,
    themeOptions,
    setTheme
  }
}

export default useTheme
