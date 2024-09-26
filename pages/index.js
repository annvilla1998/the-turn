import styles from '@/styles/Home.module.scss';
import MainHeader from '@/components/layouts/MainHeader';

function Home() {
  return <>Home</>;
}

Home.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};

export default Home;
