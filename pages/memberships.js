import React from "react";
import MainHeader from "@/components/layouts/MainHeader";

export default function Memberships() {
  return <div>Memberships</div>;
}

Memberships.getLayout = function getLayout(page) {
  return <MainHeader>{page}</MainHeader>;
};
