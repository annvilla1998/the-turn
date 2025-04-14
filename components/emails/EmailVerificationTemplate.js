import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Img,
  Section,
  Text,
  Link,
  Hr,
  Button
} from "@react-email/components";
import * as React from "react";
import { address } from "@/utils/constants";

const EmailVerificationTemplate = ({ userName, url }) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email for The Turn</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://theturnvv.com/images/logo.png"
              alt="The Turn Logo"
              width="300"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Container style={messageContainer}>
              <Text style={greeting}>Hey, {userName}</Text>
              <Text style={bodyText}>
                You're receiving this message because you recently signed up for
                an account at The Turn!
              </Text>
              <Text style={bodyText}>
                Please confirm your email address by clicking the button below
                to be able to book your time with us at The Turn!
              </Text>
            </Container>
          </Section>

          {/* Button Section */}
          <Section style={buttonSection}>
            <Button href={url} style={button}>
              Confirm email
            </Button>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>The Turn</Text>
            <Hr style={divider} />
          </Section>

          {/* Social */}
          <Section style={socialSection}>
            <Img
              src="https://theturnvv.com/images/logo.png"
              alt="The Turn Logo"
              width="125"
              style={footerLogo}
            />

            <div style={socialContainer}>
              <Link
                href="https://www.instagram.com/theturnvv/"
                style={socialLink}
              >
                <Img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  width="32"
                  height="32"
                  style={socialIcon}
                />
              </Link>
              <Link
                href="https://www.tiktok.com/@theturnvv?lang=en"
                style={socialLink}
              >
                <Img
                  src="https://cdn-icons-png.flaticon.com/512/3046/3046122.png"
                  alt="TikTok"
                  width="32"
                  height="32"
                  style={socialIcon}
                />
              </Link>
            </div>

            <Link
              href="https://www.google.com/maps?ll=34.469187,-117.354963&z=14&t=m&hl=en&gl=US&mapclient=embed&q=12044+Dunia+Rd+F+Victorville,+CA+92392"
              style={addressText}
            >
              {address}
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailVerificationTemplate;

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "20px 0"
};

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: 0,
  overflow: "hidden"
};

const header = {
  backgroundColor: "#efefef",
  borderRadius: "20px 20px 0 0",
  padding: "40px 40px 20px",
  textAlign: "center"
};

const logo = {
  margin: "0 auto",
  borderRadius: "100px"
};

const contentSection = {
  backgroundColor: "#efefef",
  padding: "0 40px"
};

const messageContainer = {
  backgroundColor: "#fafafa",
  borderRadius: "10px",
  padding: "20px",
  margin: "20px 0"
};

const greeting = {
  fontFamily: "Verdana, Geneva, sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  lineHeight: "33.6px",
  color: "#2D3142",
  margin: "0 0 20px"
};

const bodyText = {
  fontFamily: "Verdana, Geneva, sans-serif",
  fontSize: "15px",
  lineHeight: "27px",
  color: "#2D3142",
  margin: "10px 0"
};

const buttonSection = {
  backgroundColor: "#efefef",
  padding: "30px 40px 40px",
  textAlign: "center"
};

const button = {
  backgroundColor: "#0B0C39",
  borderRadius: "30px",
  color: "#ffffff",
  fontFamily: "Verdana, Geneva, sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center",
  display: "inline-block",
  padding: "15px 50px",
  lineHeight: "26.4px"
};

const footer = {
  backgroundColor: "#efefef",
  padding: "0 40px 20px"
};

const footerText = {
  fontFamily: "Verdana, Geneva, sans-serif",
  fontSize: "15px",
  lineHeight: "27px",
  color: "#2D3142",
  margin: 0
};

const divider = {
  borderTop: "1px solid #666666",
  margin: "40px 0 20px"
};

const socialSection = {
  backgroundColor: "#ffffff",
  padding: "40px 20px 30px",
  textAlign: "center"
};

const footerLogo = {
  margin: "0 auto 20px"
};

const socialContainer = {
  textAlign: "center",
  margin: "20px auto",
  width: "100%"
};

const socialLink = {
  display: "inline-block",
  margin: "0 8px",
  textAlign: "center"
};

const socialIcon = {
  height: "24px",
  width: "24px"
};

const addressText = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "16px 0"
};
