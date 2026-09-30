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

export const GOOGLE_APPS_SCRIPT_NEWSLETTER_URL =
    process.env.GOOGLE_APPS_SCRIPT_NEWSLETTER_URL ||
    'https://script.google.com/macros/s/AKfycbzWCrxJPHm9Ho0ExnD8cpvQ6OmazDcNMvIB7Z-cvkMmKfRcZMDVzJVlXA_fNJzajk7JBA/exec'

