import store from 'store'

type Theme = 'dark' | 'light'

export function useThemeMode() {
  const defaultMode = 'light'
  const mode = ref<Theme>(defaultMode)

  const switchToDark = () => {
    document.documentElement.classList.add('dark')
    store.set('theme', 'dark')
  }
  const switchToLight = () => {
    document.documentElement.classList.remove('dark')
    store.set('theme', 'light')
  }

  const switchThemeMode = () => {
    mode.value = store.get('theme', defaultMode)
    if (mode.value === 'dark') {
      switchToLight()
    } else {
      switchToDark()
    }
  }

  const initThemeMode = () => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      switchToDark()
    } else {
      switchToLight()
    }
  }

  return {
    mode,
    initThemeMode,
    switchThemeMode
  }
}
