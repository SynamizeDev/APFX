/**
 * Stocks layout — intentionally has no metadata export.
 * Metadata is defined at the page level in page.tsx to avoid conflicts.
 */
export default function StocksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
