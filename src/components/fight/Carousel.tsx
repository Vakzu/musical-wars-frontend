import { Image } from "@chakra-ui/react";
import * as React from "react";
import TouchSweep from "touchsweep";

import "./Carousel.css";

export type CarouselItem = {
  readonly alt?: string;
  readonly content: React.ReactNode;
  readonly image: string;
};

export type CarouselProps = {
  readonly classNamePrefix?: string;
  readonly items: CarouselItem[];
  readonly itemWidth?: number;
  readonly nextButtonContent?: string | React.ReactNode;
  readonly prevButtonContent?: string | React.ReactNode;
  readonly selectedIndex: number;
  readonly setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  readonly showControls?: boolean;
};

export const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {
  const itemWidth = props.itemWidth;
  const len = props.items.length;
  const radius = Math.round((itemWidth || 210) / 2 / Math.tan(Math.PI / len));
  const theta = 360 / len;

  const ref = React.useRef<HTMLDivElement>(null);

  const getSlideStyle = (index: number): React.CSSProperties => {
    const style: React.CSSProperties = {};

    if (index < len) {
      const cellAngle = theta * index;

      style.opacity = 1;
      style.transform = `rotateX(${cellAngle}deg) translateZ(${radius}px)`;
    } else {
      style.opacity = 0;
      style.transform = "none";
    }

    return style;
  };

  const getItemStyle = (): React.CSSProperties => {
    const angle = theta * props.selectedIndex * -1;

    return {
      transform: `translateZ(${-1 * radius}px) rotateX(${angle}deg)`,
    };
  };

  const getClassName = (parts: string | string[]) =>
    Array.isArray(parts)
      ? parts.map((part: string) => `${props.classNamePrefix}${part}`).join(" ")
      : `${props.classNamePrefix}${parts}`;

  const prev = () => props.setSelectedIndex(props.selectedIndex - 1);
  const next = () => props.setSelectedIndex(props.selectedIndex + 1);

  React.useEffect(() => {
    const area = ref?.current;
    const touchsweep = new TouchSweep(area || undefined);

    area?.addEventListener("swipeleft", next);
    area?.addEventListener("swiperight", prev);

    return () => {
      touchsweep.unbind();

      area?.removeEventListener("swipeleft", next);
      area?.removeEventListener("swiperight", prev);
    };
  });

  return (
    <>
      <div className={getClassName("")} ref={ref}>
        <div className={getClassName("__container")} style={getItemStyle()}>
          {props.items.map((item: CarouselItem, index: number) => (
            <div
              className={getClassName("__slide")}
              key={index}
              style={getSlideStyle(index)}
            >
              <Image src={item.image} alt={item.alt} />

              <div className={getClassName("__slide-overlay")}>
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {props.showControls && (
        <div className={getClassName("__controls")}>
          <button
            className={getClassName(["__control", "__control--prev"])}
            onClick={prev}
          >
            {props.prevButtonContent}
          </button>

          <button
            className={getClassName(["__control", "__control--next"])}
            onClick={next}
          >
            {props.nextButtonContent}
          </button>
        </div>
      )}
    </>
  );
};

Carousel.defaultProps = {
  showControls: false,
  classNamePrefix: "carousel",
  prevButtonContent: "Previous",
  nextButtonContent: "Next",
};

export default Carousel;
