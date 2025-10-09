import {
  render as rtlRender,
  type RenderOptions,
} from '@testing-library/react';
import type { ReactElement } from 'react';
import { SimpleProviders } from './TestProviders';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: SimpleProviders, ...options });

// Export individual functions instead of using export *
export {
  screen,
  fireEvent,
  waitFor,
  act,
  renderHook,
  cleanup,
} from '@testing-library/react';

export { customRender as render };
