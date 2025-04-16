"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import eventData from "../data/EventData.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Events = () => {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const isTruncated = (text) => {
    const maxLines = 3;
    const lineHeight = 1.5;
    const maxHeight = maxLines * lineHeight * 16;
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.width = "200px";
    div.style.lineHeight = `${lineHeight}em`;
    div.style.fontSize = "16px";
    div.innerText = text;
    document.body.appendChild(div);
    const isTruncated = div.offsetHeight > maxHeight;
    document.body.removeChild(div);
    return isTruncated;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="max-w-full mx-auto mt-20 w-full h-full">
      <h1 className="text-4xl font-bold text-center mt-3 text-darkBlue">
        Events Timeline
      </h1>
      <h3 className="font-bold text-center text-2xl">
        Department of Computer Science
      </h3>

      {/* Mobile View */}
      <div className="sm:hidden justify-center p-10 flex flex-col mx-auto">
        {eventData.map((item, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex flex-col justify-between leading-normal">
              <h3
                className="mb-3 mt-10 font-semibold text-xl"
                style={{ color: item.textColor }}
              >
                {item.title}
              </h3>
              <p
                className="leading-snug tracking-wide text-justify"
                style={{ color: item.textColor }}
              >
                {expanded[index] || !isTruncated(item.description)
                  ? item.description
                  : `${item.description.slice(0, 225)}`}
                {item.description.length > 250 &&
                  isTruncated(item.description) && (
                    <span
                      onClick={() => toggleReadMore(index)}
                      className="text-darkBlue cursor-pointer ml-2"
                    >
                      {expanded[index] ? "Read Less" : "...Read More"}
                    </span>
                  )}
              </p>
            </div>
            {item.images?.length > 0 &&
              (item.images.length === 1 ? (
                <img
                  src={item.images[0]}
                  alt={`Event ${index + 1} image`}
                  className="w-full h-[250px] object-cover rounded-md"
                />
              ) : (
                <Slider {...sliderSettings}>
                  {item.images.map((imageSrc, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={imageSrc}
                      alt={`Event ${index + 1} image ${imgIndex + 1}`}
                      className="w-full h-[250px] object-cover rounded-md"
                    />
                  ))}
                </Slider>
              ))}
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block relative wrap overflow-hidden p-10 pb-32 h-full">
        <div
          className="border-2-2 absolute border-opacity-20 h-full border"
          style={{ left: "50%" }}
        ></div>
        {eventData.map((item, index) => (
          <div
            key={index}
            className={`-mb-20 flex justify-between items-center w-full ${
              item.position === "right"
                ? "right-timeline"
                : "left-timeline flex-row-reverse"
            }`}
          >
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-darkBlue shadow-xl w-8 h-8 rounded-full"></div>
            <div
              className={`order-1 ${item.bgColor} flex flex-col gap-3 rounded-lg shadow-xl w-5/12 px-6 py-4`}
            >
              <div>
                <h3
                  className="mb-3 font-semibold text-xl"
                  style={{ color: item.textColor }}
                >
                  {item.title}
                </h3>
                <p
                  className="leading-snug tracking-wide text-justify"
                  style={{ color: item.textColor }}
                >
                  {expanded[index] || !isTruncated(item.description)
                    ? item.description
                    : `${item.description.slice(0, 225)}`}
                  {item.description.length > 250 &&
                    isTruncated(item.description) && (
                      <span
                        onClick={() => toggleReadMore(index)}
                        className="text-darkBlue cursor-pointer ml-2"
                      >
                        {expanded[index] ? "Read Less" : "...Read More"}
                      </span>
                    )}
                </p>
              </div>
              {item.images?.length > 0 &&
                (item.images.length === 1 ? (
                  <img
                    src={item.images[0]}
                    alt={`Event ${index + 1} image`}
                    className="w-full h-[300px] object-cover rounded-md"
                  />
                ) : (
                  <Slider {...sliderSettings}>
                    {item.images.map((imageSrc, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={imageSrc}
                        alt={`Event ${index + 1} image ${imgIndex + 1}`}
                        className="w-full h-[300px] object-cover rounded-md"
                      />
                    ))}
                  </Slider>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
