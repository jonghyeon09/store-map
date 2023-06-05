import Header from '@/components/common/Header';
import styles from '../styles/header.module.scss';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import MapSection from '@/components/home/MapSection';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Store } from '@/types/store';
import useStores from '@/hooks/useStores';
import { useEffect } from 'react';

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
      <Header
        rightElements={[
          <button
            key={'button'}
            className={styles.box}
            style={{ marginRight: 8 }}
            onClick={() => {
              alert('복사!');
            }}
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link href={'/feedback'} key={'feed'} className={styles.box}>
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
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
