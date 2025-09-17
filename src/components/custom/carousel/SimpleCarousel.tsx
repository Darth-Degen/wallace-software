import { FC, useState } from "react";

interface SimpleCarouselProps {
  className?: string;
}

const SimpleCarousel: FC<SimpleCarouselProps> = ({ className = "" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Simple slide data for now
  const slides = [
    { id: "home", title: "Home", content: "Welcome to my portfolio" },
    { id: "about", title: "About", content: "About me section" },
    { id: "experience", title: "Experience", content: "My work experience" },
    { id: "skills", title: "Skills", content: "Technical skills" },
    { id: "portfolio", title: "Portfolio", content: "My projects" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className={`w-full h-full ${className}`}>
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{currentSlideData.title}</h2>
          <p className="text-lg text-muted-foreground">{currentSlideData.content}</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-4">
        <button 
          onClick={prevSlide}
          className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/80"
        >
          Previous
        </button>
        
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={nextSlide}
          className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/80"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SimpleCarousel;
