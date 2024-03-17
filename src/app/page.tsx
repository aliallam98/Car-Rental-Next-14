import BackgroundVideo from '@/components/BackGroundVideo'
import Hero from '@/components/Hero'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Hero/>
      
      
      <BackgroundVideo
      headingOne='100+ SPORTS & LUXURY CARS'
      headingTwo='DRIVE YOUR DREAM CAR'
      paragraph='Rent a sports or luxury car , delivered directly to your hotel in Dubai'
      buttonTitle='Explore More'
      videoSrc='https://superiorrental.ae/wp-content/uploads/2022/11/superiorrental_314490425_187269707166332_6565750554188137897_n.mp4'
      />
      <BackgroundVideo
      headingOne='DRIVEN'
      headingTwo='BY LUXURY'
      paragraph='You Dream Car Just In One Place'
      buttonTitle='Explore More'
      videoSrc='https://superiorrental.ae/wp-content/uploads/2022/11/superiorrental_314656000_538208724310258_289818788983981628_n.mp4'
      />
    </main>
  )
}
