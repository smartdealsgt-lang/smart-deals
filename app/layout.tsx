// app/layout.tsx
export const metadata = {
  title: 'Smart Deals',
  description: 'Shopify-powered store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial', margin: 0, padding: 20, background: '#f7f7f8' }}>
        <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <strong>🛍️ Smart Deals</strong>
          <nav style={{ display:'flex', gap:12 }}>
            <a href="/" style={{ textDecoration:'none' }}>Home</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
