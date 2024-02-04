export const useCopy = () => {
  const copied = ref(false)
  const copy = async (content: string) => {
    try {
      // execCommand
      const aux = document.createElement('input')
      aux.setAttribute('value', content)
      document.body.appendChild(aux)
      aux.select()
      const status = document.execCommand('copy')
      document.body.removeChild(aux)
      if (status) {
        copied.value = true
        resetCopied()
        return
      }

      // Clipboard.writeText()
      await navigator.clipboard.writeText(content)
      copied.value = true
      resetCopied()
    } catch (error) {
      copied.value = false
    }
  }
  const resetCopied = () => {
    setTimeout(() => {
      copied.value = false
    }, 1500)
  }

  return {
    copied,
    copy
  }
}
