import type { SentryCliPluginOptions } from '@sentry/webpack-plugin'

export function getRootVersion(): string
export function getAppVersion(): string
export function getSentryOptions(): SentryCliPluginOptions
