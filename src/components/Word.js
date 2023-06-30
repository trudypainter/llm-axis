import { useEffect, useRef, useState } from "react";

const Word = ({ x, y, text }) => {
  const ref = useRef(null);
  const [prevPos, setPrevPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const animation = ref.current?.animate(
      [
        // keyframes
        { transform: `translate(${prevPos.x}px, ${prevPos.y}px)` },
        { transform: `translate(${x}px, ${y}px)` },
      ],
      {
        // timing options
        duration: 1000,
        easing: "ease-out",
        fill: "forwards",
      }
    );

    // When the animation ends, update the previous position to the current position
    animation?.addEventListener("finish", () => setPrevPos({ x, y }));
  }, [x, y]);

  return (
    <text ref={ref} fill="black" fontSize="4" stroke="black" strokeWidth="0.2">
      {text}
    </text>
  );
};

export default Word;
