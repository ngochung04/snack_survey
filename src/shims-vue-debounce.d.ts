declare module 'vue-debounce' {
  import type { Directive, Plugin } from 'vue'

  interface PluginConfig {
    lock?: boolean
    listenTo?: string | string[]
    defaultTime?: string | number
    fireOnEmpty?: boolean
    cancelOnEmpty?: boolean
    trim?: boolean
  }

  interface DebounceInstance<A extends unknown[]> {
    (...args: A): void | Promise<void>
    cancel(): void
  }

  export function debounce<A extends unknown[]>(fn: (...args: A) => void | Promise<void>, wait: number | string): DebounceInstance<A>

  const plugin: Plugin
  export default plugin
}
