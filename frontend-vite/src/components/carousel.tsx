import { Carousel } from "@material-tailwind/react";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <div className="w-full h-[500px]"> {/* Parent must have height */}
      <Carousel
        autoplay={true}
        className="h-full rounded-xl"
        transition={{ duration: 2 }}
        placeholder={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx + 1}`}
            className="h-full w-full object-cover rounded-xl"
          />
        ))}
      </Carousel>
    </div>
  );
}
