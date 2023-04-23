import React from "react";
import { styles } from "../../../styles";

const WelcomePage = () => {
  return (
    <section className="h-screen mx-auto">
      <div
        className={`${styles.paddingX} relative top-[40px] max-w-7xl mx-auto flex flex-row items-start gap-8 `}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#0077C2]" />
          <div className="w-1 sm:h-80 h-40 bg-gradient-to-b from-[#0077C2] to-[#0077C200]" />
        </div>
        <div>
          <h1 className={`${styles.welcomeMainText} text-[#0077C2]`}>
            .Hortex
          </h1>
          <p className={`${styles.welcomeSubText} mt-4`}>
            some text underneath
          </p>
          <p className={`${styles.welcomeSubText} mt-4`}>it works trust me</p>
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;

// colors to consider later

// #3A405A
// #577590
// #1A2A3A
// #0F4C81
// #0077C2
// #0072BB
// #2F5DA6
// #19486A
