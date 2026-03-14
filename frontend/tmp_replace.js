const fs = require('fs');
const file = 'd:/desktop/APFX/frontend/components/layout/Header.tsx';
let content = fs.readFileSync(file, 'utf8');

const newNav = `const NAV_LINKS = [
    { label: 'Trade & Invest', href: '/products', hasMegaMenu: true },
    { label: 'Tools', href: '/tools', hasMegaMenu: true },
    { label: 'Learn', href: '/academy', hasMegaMenu: true },
    { label: 'Become a Partner', href: '/partners', hasMegaMenu: false },
    { label: 'Company', href: '/about', hasMegaMenu: true },
    { label: 'Trade Calculators', href: '/tools/calculators', hasMegaMenu: true },
]

const MEGA_MENU_DATA = {
    'Trade & Invest': [
        {
            title: '',
            links: [
                { label: 'Stocks', href: '/products/stocks' },
                { label: 'F&O', href: '/products/options' },
                { label: 'Mutual Funds', href: '/products/mutual-funds' },
                { label: 'IPO', href: '/products/ipo' },
                { label: 'MTF', href: '/products/mtf' },
                { label: 'Recommendation', href: '/products/recommendation' },
            ],
        },
    ],
    Tools: [
        {
            title: '',
            links: [
                { label: 'Calculators', href: '/tools/calculators' },
                { label: 'Stock Compare', href: '/tools/stock-compare' },
                { label: 'Mutual Funds Compare', href: '/tools/mutual-funds-compare' },
            ],
        },
    ],
    Learn: [
        {
            title: '',
            links: [
                { label: 'Blog', href: '/academy/blog' },
                { label: 'Glossary', href: '/academy/glossary' },
            ],
        },
    ],
    Company: [
        {
            title: '',
            links: [
                { label: 'About Us', href: '/about/about-us' },
                { label: 'Press', href: '/about/press' },
            ],
        },
    ],
    'Trade Calculators': [
        {
            title: '',
            links: [
                { label: 'Pip Calculator', href: '/tools/calculators/pip' },
                { label: 'Forex Margin Calculator', href: '/tools/calculators/margin' },
                { label: 'Position Size Calculator', href: '/tools/calculators/position-size' },
                { label: 'Forex Rebate Calculator', href: '/tools/calculators/rebate' },
            ],
        },
    ],
}`;

const lines = content.split('\n');
// The original lines are 8 to 350. We want to cut them out.
lines.splice(8, 343, newNav);

fs.writeFileSync(file, lines.join('\n'));
console.log('Replaced successfully');
