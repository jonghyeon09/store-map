import MapSection from '@/components/home/MapSection';
import { GetStaticProps } from 'next';
import { Store } from '@/types/store';
import useStores from '@/hooks/useStores';
import { useEffect } from 'react';
import HomeHeader from '@/components/home/HomeHeader';

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
      <HomeHeader />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
};
