import { redirect } from 'next/navigation'

/** `/trade&invest` rewrites here — only these five hubs exist under Trade & Invest */
export default function ProductsIndexPage() {
    redirect('/products/range')
}
