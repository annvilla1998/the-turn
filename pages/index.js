;

import styles from "@/styles/Home.module.scss";
import MainHeader from "@/components/layouts/MainHeader";
import { ImageCarousel } from "@/components/image-carousel";
import HourlyRates from "@/components/hourly-rates";
import { Box } from "@mui/system";

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.introduction}>
        <p>
          <strong>
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
          <br />
          Experience the future of golf in a relaxed, social atmosphere—whether
          you're an avid golfer or a newcomer, we’ve got something for everyone.
        </p>
        <img src="/images/gameplay.jpg" />
      </section>
      <section className={styles.hourly_rates__container}>
        <HourlyRates />
      </section>
      <section>
        <ImageCarousel />
      </section>
      <section>
      <Box sx={{ width: "100%" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13157.314576223032!2d-117.36524167366714!3d34.46918626984016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c366223d5c6baf%3A0x8bd8fae0adc9699c!2s12044%20Dunia%20Rd%20F%2C%20Victorville%2C%20CA%2092392!5e0!3m2!1sen!2sus!4v1741927695856!5m2!1sen!2sus"
        style={{
          width: "100%",
          height: "400px",
          border: "none",
        }}
        allowFullScreen
      />
    </Box>
      </section>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};

export default Home;
