import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const category = [
  "FrontEnd Developer",
  "BackEnd Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
 
];

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    navigate(`jobs/browse/${query}`);
  };

  return (
    <div className=" ">
      <Carousel className="text-[10px]">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="basis-5/2 text-[10px]">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="text-[8px] md:text-sm rounded-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
