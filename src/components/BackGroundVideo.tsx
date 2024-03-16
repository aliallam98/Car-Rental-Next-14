import Button from "./Button"
import Video from "./Video"

interface IProps {
  headingOne:string
  headingTwo:string
  paragraph:string
  buttonTitle:string
  videoSrc:string
}
function BackgroundVideo({headingOne,headingTwo,paragraph,buttonTitle,videoSrc}:IProps){
    return(
        <section className="py-5 md:py-10">
        <div className="relative overflow-hidden h-[500px] max-w-full">
          <div className="container absolute top-1/2 -translate-y-1/2 z-30">
            <div className="px-6 text-center text-white md:px-12">
              <h3 className="tracking-[6px] text-xl md:text-2xl">{headingOne}</h3>
              <h2 className="my-5 text-2xl md:text-3xl font-bold tracking-tight">{headingTwo}</h2>
              <p>{paragraph}</p>
              <Button
              title={buttonTitle}
              >
                
              </Button>
            </div>
          </div>
          <Video src={videoSrc}
            />
          <div className="absolute inset-0 bg-black/60 z-10"/>
        </div>
      </section>
    )
}

export default BackgroundVideo
