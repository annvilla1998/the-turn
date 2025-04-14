import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Hr,
  Text,
  Link
} from "@react-email/components";
import { address } from "@/utils/constants";

const SubscribeConfirmation = ({ unsubscribeUrl }) => {
  return (
    <Html>
      <Head />
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
              <Text style={greeting}>Successfully Subscribed!</Text>
              <Text style={bodyText}>
                You have been successfully subscribed to our mailing list.
              </Text>
            </Container>
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

            <Link href={unsubscribeUrl} style={unsubscribeLink}>
              Unsubscribe
            </Link>

            <Text style={addressText}>{address}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default SubscribeConfirmation;

// Styles (copied from ResetPasswordEmailTemplate for consistency)
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

const unsubscribeLink = {
  fontFamily: "Verdana, Geneva, sans-serif",
  fontSize: "13px",
  color: "#2D3142",
  textDecoration: "none"
};

const addressText = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "16px 0"
};
