import Image from "next/image";
import WelcomeBottles from "./WelcomeBottles";
import WelcomeWipes from "./WelcomeWipes";
import WelcomeBowls from "./WelcomeBowls";

export default function HomeWelcome() {
  return (
    <div className="mt-24">
      <h2 className="text-8xl text-[#e6b724] font-bold max-lg:text-5xl">
        いらっしゃいませ
      </h2>
      <div className="rounded-4xl bg-[#b1d5ed] items-center justify-center flex px-8 py-3 my-8 w-fit max-lg:px-6 max-lg:py-2">
        <p className="text-2xl text-[#4065dd] font-bold max-lg:text-lg">
          Welcome
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-5xl font-bold max-xl:text-4xl max-lg:text-2xl">
          Welcome to Mamiko
        </h3>
        <p className="text-xl max-xl:text-lg max-lg:text-base">
          Where little moments make lasting memories, welcome to Mamiko, your
          home for everyday essentials built with love.
        </p>
      </div>
      <div className="flex relative mt-10 gap-8 max-md:flex-col">
        <WelcomeBottles />
        <div className="w-2/5 flex flex-col gap-8 max-md:w-full max-md:flex-row max-sm:flex-col">
          <WelcomeWipes />
          <WelcomeBowls />
        </div>
      </div>
    </div>
  );
}
