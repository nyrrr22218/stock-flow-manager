import Tab1 from '@/components/tab/tab1/tab-1';

async function getUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return { item: [] };
  const res = await fetch(`${siteUrl}/api/tab1`, {
    cache: 'no-store',
  });
  if (!res.ok) return { item: [] };
  return res.json();
}

export default async function page() {
  const data = await getUrl();
  return <Tab1 tab1Data={data.items ?? []} />;
}
