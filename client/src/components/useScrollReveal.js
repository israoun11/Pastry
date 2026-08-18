import { useEffect, useRef, useState } from "react";

/**
 * Fires visible = true once the attached element enters the viewport,
 * then stops observing. Powers every scroll-reveal in the Tasting Room.
 */
const useScrollReveal = (threshold = 0.3) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

export default useScrollReveal;