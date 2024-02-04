const events = new Map<string, Set<Function>>()

type AppEvent = string

function on(event: AppEvent, handler: () => void) {
  const handlers = events.get(event) || new Set()
  handlers.add(handler)
  events.set(event, handlers)
}

function once(event: AppEvent, handler: (...args: any[]) => void) {
  function _handler(..._args: any[]) {
    off(event, _handler)
    handler(..._args)
  }
  return on(event, _handler)
}

function off(event: AppEvent, handler: () => void) {
  const handlers = events.get(event) || new Set()
  handlers.delete(handler)

  if (handlers.size === 0) {
    events.delete(event)
  }
}

function emit(event: AppEvent, ...payload: any[]) {
  const handlers = events.get(event)
  if (!handlers) return

  handlers.forEach(handler => {
    handler(...payload)
  })
}

function auto(event: AppEvent, handler: () => void) {
  onMounted(() => on(event, handler))
  onUnmounted(() => off(event, handler))
}

export const useAPPEventHub = () => {
  return { on, once, off, emit, auto }
}
