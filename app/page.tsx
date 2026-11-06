import Categories from "@/components/home/Catagories";
import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroCarousel from "@/components/home/Hero";
import HostSupport from "@/components/home/HostSupport";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (<div>
    <HeroCarousel/>
    <FeaturedStudios/>
    <Categories />
    <HowItWorks />
    <HostSupport/>
  </div>);
}
