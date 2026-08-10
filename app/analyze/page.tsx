import type { Metadata } from "next";
import Header from "@/components/Header";
import Wizard from "@/components/wizard/Wizard";
import { BRAND_NAME } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Your Free Hairline Analysis | ${BRAND_NAME}`,
  robots: { index: false },
};

export default function AnalyzePage() {
  return (
    <>
      <Header />
      <main>
        <Wizard />
      </main>
    </>
  );
}
