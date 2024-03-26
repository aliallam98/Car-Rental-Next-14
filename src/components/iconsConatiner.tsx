import Image from "next/image";

function IconsContainer() {
  return (
    // <!-- Icons-Conatiner -->
    <div className="flex flex-col w-[100px] fixed bottom-5 left-5 gap-4 z-50">
      <button className="flex  justify-center items-center  w-10 md:w-14 h-10 md:h-14 rounded-full  bg-black text-white">
        <Image src={"/651704-ffffff.svg"} width={30} height={30} alt="image" />
      </button>
      <button className="flex flex-col justify-center items-center  w-10 md:w-14 h-10 md:h-14 rounded-full border ">
        <Image
          src={"/2071331-4caf50.svg"}
          width={120}
          height={120}
          alt="image"
        />
      </button>
    </div>
    // <!-- Icons-Conatiner -->
  );
}

export default IconsContainer;
