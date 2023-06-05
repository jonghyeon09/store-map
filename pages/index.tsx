import Header from '@/components/common/Header';
import { Inter } from 'next/font/google';
import styles from '../styles/header.module.scss';
import Link from 'next/link';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { VscFeedback } from 'react-icons/vsc';
import MapSection from '@/components/home/MapSection';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
