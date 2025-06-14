import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { AllTheProviders } from './TestProviders'

export const render = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options })

export type { RenderOptions }
