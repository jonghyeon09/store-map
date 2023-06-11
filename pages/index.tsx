import MapSection from '@/components/home/MapSection';
import { GetStaticProps } from 'next';
import { Store } from '@/types/store';
import useStores from '@/hooks/useStores';
import { useEffect } from 'react';
import HomeHeader from '@/components/home/HomeHeader';
import DetailSection from '@/components/home/DetailSection';
import { NextSeo } from 'next-seo';

interface Props {
  stores: Store[];
}

export default function Home({ stores }: Props) {
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]);

  return (
    <>
      <NextSeo
        title="매장 지도"
        description="Next.js 학습을 위한 매장 지도 서비스입니다."
        canonical="https://store-map-five.vercel.app"
      />
      <HomeHeader />
      <main
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <MapSection />
        <DetailSection />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const stores = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stores`
  ).then((response) => response.json());

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
};
