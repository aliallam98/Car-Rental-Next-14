// 'use client'
// import Image from 'next/image';
// import React, { useRef, useState } from 'react';
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// // import 'swiper/css/navigation';

// import './styles.css';

// // import required modules
// import { Autoplay, Pagination,  } from 'swiper/modules';
// import BrandCardImage from './BrandCardImage';


// export const brandsData = [{
//   name: "lamborghini",
//   imageUrl : 'https://superiorrental.ae/wp-content/uploads/2020/04/580b585b2edbce24c47b2c8c-263x300.png'
// },
// {
//   name: "ferrari",
//   imageUrl : 'https://ios.tahastore.ly/wp-content/uploads/2020/08/scuderia-ferrari-logo-800x1050-1-e1596686694886.png'
// },
// {
//   name: "maserati",
//   imageUrl : 'https://superiorrental.ae/wp-content/uploads/2020/04/580b57fcd9996e24bc43c48f-300x169.png'
// },
// {
//   name: "bentley",
//   imageUrl : 'https://superiorrental.ae/wp-content/uploads/2020/04/580b57fcd9996e24bc43c46c-e1588197827577-300x172.png'
// },
// {
//   name: "rolls royce",
//   imageUrl : 'https://superiorrental.ae/wp-content/uploads/2020/04/580b57fcd9996e24bc43c4a0-300x300.png'
// },
// {
//   name: "mclaren",
//   imageUrl : 'https://superiorrental.ae/wp-content/uploads/2020/04/580b57fcd9996e24bc43c492-1-e1588196988333-300x56.png'
// },
// {
//   name: "porsche",
//   imageUrl : 'https://superiorrental.ae/wp-content/uploads/2020/04/10.png'
// },
// {
//   name: "tesla",
//   imageUrl : 'https://1000logos.net/wp-content/uploads/2018/02/Logo-Tesla.jpg'
// },
// {
//   name: "mercedes",
//   imageUrl : 'https://superiorrental.ae/wp-content/uploads/2020/04/580b57fcd9996e24bc43c493-e1588197984559-300x181.png'
// },
// ]



//  function AutoSilder() {
//   return (
//     <>
//     <section className='p-10'>
//     <div className='container max-w-[1140px]'>
//     <Swiper
//         slidesPerView={"auto"}
//         spaceBetween={30}
//         grabCursor={true}
//         loop={true}
//         autoplay={{
//             delay: 1500,
//             disableOnInteraction: false,
//           }}
//         //   navigation={true}
//         pagination={{
//           clickable: true,
//         }}
//         breakpoints ={{
//             0:{
//                 slidesPerView: 2
//             },
//             640:{
//                 slidesPerView: 3
//             },
//             800:{
//                 slidesPerView: 4
//             },
//             1000:{
//                 slidesPerView: 5
//             },
//         }}
//         modules={[Autoplay, Pagination]}
//         className="SwiperMany"
//       >
//         {brandsData.map((brand,i)=>(
//           <SwiperSlide
//           key={i}
//           ><BrandCardImage
//           href={`brand/${brand.name}`}
//           src={brand.imageUrl}
//           /></SwiperSlide>
//         ))}
        
//       </Swiper>
//     </div>
//     </section>

//     </>
//   );
// }



// export default AutoSilder
