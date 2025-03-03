import styles from "@/styles/Home.module.scss";
import MainHeader from "@/components/layouts/MainHeader";

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.introduction}>
        <p>
          <strong>
            <h1 className={styles.coming_soon}>COMING SOON</h1>
          <br />
          <br />
            <h1>Welcome to The Turn!</h1>
          </strong>
          <br />
          <strong>
            The ultimate indoor golf simulator lounge where technology meets
            recreation.
          </strong>
          <br />
          <br /> We offer an immersive golfing experience using state-of-the-art
          ball tracking and club data analytics, designed to cater to golf
          enthusiasts of all skill levels. Our advanced simulators provide
          highly accurate, real-time data on ball speed, spin, launch angle, and
          more, giving you the insights you need to refine your game or simply
          enjoy a fun, stress-free round.
          <br />
          <br />
          Whether you're looking to work on your swing, compete with friends, or
          unwind with a casual round in a comfortable and stylish environment,
          The Turn offers the perfect space. Featuring a variety of virtual
          courses from around the world, our simulators create an authentic
          golfing experience, all while you relax with food, drinks, and
          entertainment. Our lounge is ideal for corporate events, casual
          hangouts, or golf lessons with expert instructors (coming soon).
          <br />
          Experience the future of golf in a relaxed, social atmosphere—whether
          you're an avid golfer or a newcomer, we’ve got something for everyone.
          <br />
          <br />
          Hourly Rates: $50
        </p>
        <img src="/images/construction.jpeg" />
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};

export default Home;
