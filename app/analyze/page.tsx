import type { Metadata } from "next";
import Header from "@/components/Header";
import Wizard from "@/components/wizard/Wizard";

export const metadata: Metadata = {
  title: "Your Free Hairline Analysis | Harley Street Aesthetics",
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
