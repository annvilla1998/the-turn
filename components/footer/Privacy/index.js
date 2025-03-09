import React, { useState } from "react";
import { Modal, Typography, Box } from "@mui/material";
import styles from "../styles.module.scss";

export const Privacy = ({ style }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Typography align="end" onClick={() => setOpen(true)}>Privacy Policy</Typography>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Privacy Policy"
        aria-describedby="Privacy Policy for The Turn"
      >
        <Box className={styles.footer__privacy} sx={style}>
          <Typography id="privacy-policy-title" variant="h5" component="h2">
            Privacy Policy for The Turn Golf Simulator & Lounge
          </Typography>
          <br />
          <Typography id="privacy-policy" variant="p" component="p">
            The Turn Golf Simulator & Lounge ("we," "our," "us") is committed to
            protecting the privacy and security of your personal information.
            This Privacy Policy outlines how we collect, use, and protect your
            information when you visit our facilities, use our services, or
            interact with us online.
            <br />
            <br />
            <ol>
              <li>
                <h3>Information We Collect</h3>
                <ul>
                  We may collect the following types of personal information:
                  <li>
                    <strong>Personal Identification Information: </strong>
                    Name, email address, phone number, etc.
                  </li>
                  <li>
                    <strong>Payment Information: </strong>
                    Credit card details, billing address, etc. (processed
                    securely through third-party payment processors).
                  </li>
                  <li>
                    <strong>Usage Data: </strong>
                    Information about how you use our website, mobile app, or
                    on-site services.
                  </li>
                  <li>
                    <strong>Cookies and Tracking Technologies: </strong>
                    We use cookies to enhance your experience on our website and
                    track website analytics.
                  </li>
                </ul>
              </li>
              <br />
              <li>
                <h3>How We Use Your Information</h3>
                <ul>
                  We use the information we collect for the following purposes:
                  <li>
                    To process your bookings, reservations, and purchases.
                  </li>
                  <li>
                    To communicate with you about your account, upcoming
                    reservations, promotions, and events.
                  </li>
                  <li>To improve our services and customer experience.</li>
                  <li>
                    To analyze website traffic and optimize functionality.
                  </li>
                </ul>
              </li>
              <br />
              <li>
                <h3>Data Sharing and Disclosure</h3>
                We do not sell, rent, or trade your personal information to
                third parties. However, we may share information with trusted
                service providers and partners to assist in providing services
                (e.g., payment processors, marketing, or analytics). These third
                parties are obligated to protect your data and only use it for
                the purposes for which it was provided.
                <br />
                We may also disclose personal information if required by law or
                to protect the rights, property, or safety of The Turn Golf
                Simulator & Lounge, our customers, or others.
              </li>
              <br />
              <li>
                <h3>Security of Your Information</h3>
                We implement a variety of security measures to maintain the
                safety of your personal information, including encryption,
                access control, and regular security audits. However, no data
                transmission over the internet or electronic storage method is
                100% secure, and we cannot guarantee absolute security.
              </li>
              <br />
              <li>
                <h3>Your Rights and Choices</h3>
                <ul>
                  You have the following rights regarding your personal
                  information:
                  <li>
                    Access: You may request access to the personal data we hold
                    about you.
                  </li>
                  <li>
                    Correction: You can update or correct any inaccuracies in
                    your personal information.
                  </li>
                  <li>
                    Deletion: You can request the deletion of your personal
                    information, subject to any legal obligations we may have.
                  </li>
                  <li>
                    Opt-Out: You may choose to opt out of marketing
                    communications at any time.
                  </li>
                </ul>
              </li>
              <br />
              <li>
                <h3>Retention of Data</h3>
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy, unless a longer retention period is required or
                permitted by law.
              </li>
              <br />
              <li>
                <h3>Children's Privacy</h3>
                Our services are not intended for children under the age of 13,
                and we do not knowingly collect or solicit personal information
                from children. If we become aware that we have collected
                information from a child, we will take steps to delete it as
                soon as possible.
              </li>
              <br />
              <li>
                <h3>Changes to This Privacy Policy</h3>
                We reserve the right to update or change this Privacy Policy at
                any time. Any changes will be posted on this page, and the
                effective date will be updated accordingly.
              </li>
              <br />
              <li>
                <h3>Contact Us</h3>
                If you have any questions about this Privacy Policy or how we
                handle your personal data, please contact us at:
                <br />
                <br />
                <strong>
                  The Turn Golf Simulator & Lounge
                  <br />
                  theturnvv@gmail.com
                  <br />
                  760-983-5001
                </strong>
              </li>
            </ol>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
