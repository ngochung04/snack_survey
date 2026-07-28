import { LocalStorage } from '@/core/utils/storage'
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId
} from './themes'

export function getStoredTheme(): ThemeId {
  const stored = LocalStorage.get<unknown>(THEME_STORAGE_KEY, DEFAULT_THEME)
  return isThemeId(stored) ? stored : DEFAULT_THEME
}

export function applyTheme(themeId: ThemeId): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = themeId
}

export function persistTheme(themeId: ThemeId): void {
  LocalStorage.set(THEME_STORAGE_KEY, themeId)
}

/** Call before app mount to avoid a wrong-theme flash. */
export function applyStoredTheme(): ThemeId {
  const themeId = getStoredTheme()
  applyTheme(themeId)
  return themeId
}
