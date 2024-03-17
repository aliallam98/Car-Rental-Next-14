import React from "react";

interface IProps {
  heading: string;
  paragraph: string;
  className?: string;
}

const HeadingWithParagraph = ({ heading, paragraph, className }: IProps) => {
  return (
    <div className={`${className} text-center space-y-5`}>
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">{heading}</h2>
      <p className="md:text-xl text-gray-500">{paragraph}</p>
    </div>
  );
};

export default HeadingWithParagraph;
