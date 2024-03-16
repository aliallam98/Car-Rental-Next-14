import React from "react";

interface Video {
  src: string;
}

function Video({ src }: Video) {
  return (
    <video
      className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      autoPlay
      loop 
      muted
      src={src}
    />
  );
}

export default Video;
