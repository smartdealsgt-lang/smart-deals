// app/layout.tsx
export const metadata = {
  title: 'Smart Deals',
  description: 'Shopify-powered store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial', margin: 0, padding: 20, background: '#f7f7f8' }}>
        <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
          <a href="/" style={{ display:'flex', gap:10, alignItems:'center', textDecoration:'none', color:'inherit' }}>
            <img src="/LOGO.png" alt="Smart Deals" style={{ width:36, height:36, borderRadius:8 }} />
            <strong>Smart Deals</strong>
          </a>
          <nav style={{ display:'flex', gap:12 }}>
            <a href="/" style={{ textDecoration:'none' }}>Home</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}


