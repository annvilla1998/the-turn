import { address } from "@/utils/constants";
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
  Hr
} from "@react-email/components";
import * as React from "react";

const NewsletterTemplate = ({ imageUrl, caption, unsubscribeUrl }) => {
  return (
    <Html>
      <Head />
      <Preview>{caption}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://theturnvv.com/images/logo.png"
              alt="The Turn Logo"
              width="120"
              style={logo}
            />
            <Text style={headerText}>NEWSLETTER</Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Img src={imageUrl} alt="Newsletter" width="540" style={image} />
            {caption && <Text style={captionText}>{caption}</Text>}
          </Section>

          {/* Divider */}
          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>The Turn</Text>

            <div style={socialContainer}>
              <Link
                href="https://www.instagram.com/theturnvv"
                style={socialLink}
              >
                <Img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  width="24"
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
                  width="24"
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

            <Text style={unsubscribeText}>
              If you no longer wish to receive these emails, you may{" "}
              <Link href={unsubscribeUrl} style={link}>
                unsubscribe here
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterTemplate;

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "20px 0"
};

const container = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  maxWidth: "600px",
  margin: "0 auto",
  padding: 0,
  overflow: "hidden"
};

const header = {
  backgroundColor: "#2D3142",
  padding: "24px",
  textAlign: "center"
};

const logo = {
  margin: "0 auto 12px"
};

const headerText = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  letterSpacing: "2px",
  margin: 0
};

const contentSection = {
  padding: "32px 30px 20px",
  textAlign: "center"
};

const image = {
  borderRadius: "6px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "100%"
};

const captionText = {
  color: "#333333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "24px 0 0",
  textAlign: "left"
};

const divider = {
  borderTop: "1px solid #e6e6e6",
  margin: "0 30px"
};

const footer = {
  padding: "24px 30px 32px",
  textAlign: "center"
};

const footerText = {
  color: "#2D3142",
  fontSize: "18px",
  fontWeight: "600",
  margin: "0 0 16px"
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

const unsubscribeText = {
  color: "#888888",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "16px 0 0"
};

const link = {
  color: "#4a69bd",
  textDecoration: "underline"
};
