import { useEffect, useState } from "react";

const RotatingWords = () => {
  const words = ["funcionales", "exitosos", "innovadores"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1000); // cada 1 segundo
    return () => clearInterval(interval);
  }, []);

  return (
    <strong className="text-[#E18708] font-medium h-[30px] overflow-hidden inline-block">
      <span
        className="block transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(-${index * 30}px)` }}
      >
        {words.map((word, i) => (
          <div key={i} className="h-[30px] flex items-center">
            {word}.
          </div>
        ))}
      </span>
    </strong>
  );
};

export default RotatingWords;
