import { getAllBrands } from "@/actions/brand.actions";
import BackgroundVideo from "@/components/BackGroundVideo";
import BrandsAutoSlider from "@/components/BrandsAutoSlider";
import Hero from "@/components/Hero";
import BookingModel from "@/components/models/BookingModel";

export default async function Home() {
  const brands = await getAllBrands();
  return (
    <main>
      <Hero />
      <BrandsAutoSlider brands={brands} />
      <BackgroundVideo
        headingOne="100+ SPORTS & LUXURY CARS"
        headingTwo="DRIVE YOUR DREAM CAR"
        paragraph="Rent a sports or luxury car , delivered directly to your hotel in Dubai"
        buttonTitle="Explore More"
        videoSrc="https://superiorrental.ae/wp-content/uploads/2022/11/superiorrental_314490425_187269707166332_6565750554188137897_n.mp4"
      />
      <BackgroundVideo
        headingOne="DRIVEN"
        headingTwo="BY LUXURY"
        paragraph="You Dream Car Just In One Place"
        buttonTitle="Explore More"
        videoSrc="https://superiorrental.ae/wp-content/uploads/2022/11/superiorrental_314656000_538208724310258_289818788983981628_n.mp4"
      />
    </main>
  );
}
