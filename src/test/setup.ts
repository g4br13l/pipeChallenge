import { afterEach, vi } from 'vitest'
import "@testing-library/jest-dom/vitest"
import { cleanup } from '@testing-library/react'
import '@testing-library/user-event'



// Mock do ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
