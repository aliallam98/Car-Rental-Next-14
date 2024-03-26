
interface IProps {
  videoUrl: String;
}
const RelatedVideoSection = ({ videoUrl }: IProps) => {
  function getYoutubeVideoId(url: string) {
    const params = new URLSearchParams(url.split("?")[1]); // Extract query string
    return params.get("v"); // Get the value of the 'v' parameter (video ID)
  }
  const videoId = getYoutubeVideoId(`${videoUrl}`);

  return (
    <section className="py-5">
      <div className="container flex flex-col justify-center items-center">
        <h2 className="text-xl md:text-3xl mb-10 font-semibold">
          Related Video
        </h2>
        <iframe
          className="w-full  h-[600px] lg:h-[600px] "
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Mercedes-Benz G-Class: The Test"
        />
      </div>
    </section>
  );
};

export default RelatedVideoSection;
