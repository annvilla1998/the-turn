import React from "react";
import MainHeader from "@/components/layouts/MainHeader";

export default function AboutUs() {
  return <div>About Us</div>;
}

AboutUs.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};
