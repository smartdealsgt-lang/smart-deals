// lib/shopify.ts
const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const TOKEN  = process.env.SHOPIFY_STOREFRONT_TOKEN!;

export async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const res = await fetch(`https://${DOMAIN}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Force dynamic at build for Vercel
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify error: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

export type ProductCard = {
  id: string;
  handle: string;
  title: string;
  featuredImage?: { url: string } | null;
  price: string;
};

export async function listProducts(limit = 24): Promise<ProductCard[]> {
  const query = `
    query ListProducts($limit: Int!) {
      products(first: $limit, sortKey: UPDATED_AT, reverse: true) {
        edges {
          node {
            id
            handle
            title
            featuredImage { url }
            variants(first: 1) {
              edges { node { price { amount currencyCode } } }
            }
          }
        }
      }
    }
  `;
  type Gql = {
    data: {
      products: {
        edges: { node: {
          id: string; handle: string; title: string;
          featuredImage?: { url: string } | null;
          variants: { edges: { node: { price: { amount: string; currencyCode: string }}}[] }
        }}[]
      }
    }
  };
  const res = await shopifyFetch<Gql>(query, { limit });
  return res.data.products.edges.map(({ node }) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    featuredImage: node.featuredImage,
    price: `${node.variants.edges[0]?.node.price.amount} ${node.variants.edges[0]?.node.price.currencyCode}`,
  }));
}
