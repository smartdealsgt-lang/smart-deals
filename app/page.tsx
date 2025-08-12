// app/page.tsx
import { listProducts } from '@/lib/shopify'

export default async function Home() {
  const products = await listProducts(24)

  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:16 }}>
      {products.map(p => (
        <a key={p.id} href={`https://smartdealsae.myshopify.com/products/${p.handle}`} style={{
          background:'#fff', borderRadius:12, padding:16, boxShadow:'0 1px 3px rgba(0,0,0,0.08)',
          textDecoration:'none', color:'inherit'
        }}>
          {p.featuredImage?.url ? (
            <img src={p.featuredImage.url} alt={p.title}
              style={{ width:'100%', height:140, objectFit:'cover', borderRadius:8, marginBottom:8 }} />
          ) : <div style={{ height:140, background:'#f2f2f2', borderRadius:8, marginBottom:8 }} />}
          <div style={{ fontWeight:700, marginBottom:6 }}>{p.title}</div>
          <div style={{ fontSize:12, color:'#666' }}>{p.price}</div>
        </a>
      ))}

      {products.length === 0 && (
        <div>No products found. Check your Storefront API token + permissions.</div>
      )}
    </div>
  )
}
