import { PropsWithChildren } from "react";
import * as React from "react";
import { render } from "@testing-library/react";
import type { RenderOptions, RenderResult } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "@/store/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
): RenderResult & { store: AppStore } {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions });
  return {
    ...renderResult,
    store,
  };
}

export { renderWithProviders as render };
