import React, { useEffect, useRef, useState } from "react";

/**
 * Eases a displayed number toward value over duration ms
 * using requestAnimationFrame — powers the Flavor spectrum's live stats.
 */
const AnimatedNumber = ({ value, duration = 650, suffix = "%" }) => {
  const [display, setDisplay] = useState(value);
  const frameRef = useRef(null);
  const startValueRef = useRef(value);

  useEffect(() => {
    const startValue = startValueRef.current;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (value - startValue) * eased;
      setDisplay(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        startValueRef.current = value;
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {Math.round(display)}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;