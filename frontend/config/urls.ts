export const PORTAL_URL = 'https://portal.apfxglobal.com/'

export const PORTAL_SIGNUP_URL = 'https://portal.apfxglobal.com/signup'

export const PORTAL_LINK_PROPS = {
    href: PORTAL_URL,
    target: '_blank',
    rel: 'noopener noreferrer',
    prefetch: false,
} as const

export const PORTAL_SIGNUP_LINK_PROPS = {
    href: PORTAL_SIGNUP_URL,
    target: '_blank',
    rel: 'noopener noreferrer',
    prefetch: false,
} as const

export const GOOGLE_APPS_SCRIPT_URL =
    process.env.GOOGLE_APPS_SCRIPT_URL ||
    process.env.GOOGLE_APPS_SCRIPT_NEWSLETTER_URL ||
    'https://script.google.com/macros/s/AKfycbwJ-8BT5y36r4V7rz2ZqT1dL_fGhQIduozgh22fvGqQS6lYkShR5t5XMWqR0Nj7gVqg-Q/exec'

export const GOOGLE_APPS_SCRIPT_NEWSLETTER_URL = GOOGLE_APPS_SCRIPT_URL


