import { ITheme, useBreakpointValue } from 'native-base'

type Breakpoints = keyof ITheme['breakpoints']

export function useBreakpoint<T>(value: Partial<Record<Breakpoints, T>>) {
  return useBreakpointValue(value)
}
