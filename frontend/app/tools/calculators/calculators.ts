/**
 * Shared list of Trade Calculators for sidebar and nav.
 * Keep in sync with Header dropdown (Trade Calculators).
 */
export const CALCULATORS = [
    { label: 'Pip Calculator', href: '/tools/calculators/pip', slug: 'pip' },
    { label: 'Forex Margin Calculator', href: '/tools/calculators/margin', slug: 'margin' },
    { label: 'Position Size Calculator', href: '/tools/calculators/position-size', slug: 'position-size' },
    { label: 'Forex Rebate Calculator', href: '/tools/calculators/rebate', slug: 'rebate' },
] as const
