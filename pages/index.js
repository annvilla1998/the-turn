import styles from '@/styles/Home.module.scss';
import MainHeader from '@/components/layouts/MainHeader';

function Home() {
  return <div className={styles.home}>Home</div>;
}

Home.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};

export default Home;
