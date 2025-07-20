import Wrapper from "@/components/Wrapper";
import Navbar from "@/components/general/navbar";
import HomeHero from "@/components/home/HomeHero";
import HomeWelcome from "@/components/home/HomeWelcome";
import HomeWhyUs from "@/components/home/HomeWhyUs";
import HomeTrusted from "@/components/home/HomeTrusted";
import HomeJoinUs from "@/components/home/HomeJoinUs";

export default function Home() {
  return (
    <Wrapper>
      <Navbar />
      <div className="px-16 overflow-hidden max-lg:px-8 max-sm:px-6">
        <HomeHero />
        <HomeWelcome />
        <HomeWhyUs />
        <HomeTrusted />
        <div className="w-full aspect-square relative">
          <div className="w-full absolute top-0 max-sm:top-[-20%]">
            <HomeJoinUs />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
