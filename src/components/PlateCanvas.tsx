import { useEffect, useMemo, useRef, useState } from "react";
import { MOTIF_URL, MOTIF_BASE_WIDTH_CM } from "../constants";

const PlateCanvas = ({ plates }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [mirroredImageUrl, setMirroredImageUrl] = useState(MOTIF_URL);

  const { totalWidth, maxHeight } = useMemo(
    () =>
      plates.reduce(
        (acc, plate, index) => {
          const margin = index > 0 ? 3 : 0;
          return {
            totalWidth: acc.totalWidth + plate.width + margin,
            maxHeight: Math.max(acc.maxHeight, plate.height),
          };
        },
        { totalWidth: 0, maxHeight: 0 }
      ),
    [plates]
  );

  useEffect(() => {
    if (totalWidth <= MOTIF_BASE_WIDTH_CM) {
      setMirroredImageUrl(MOTIF_URL);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = MOTIF_URL;

    img.onload = () => {
      const requiredMirrors = Math.ceil(totalWidth / MOTIF_BASE_WIDTH_CM);
      const canvas = document.createElement("canvas");
      canvas.width = img.width * requiredMirrors;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      for (let i = 0; i < requiredMirrors; i++) {
        const offsetX = i * img.width;
        if (i % 2 === 1) {
          ctx.save();
          ctx.translate(offsetX + img.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(img, 0, 0);
          ctx.restore();
        } else {
          ctx.drawImage(img, offsetX, 0);
        }
      }
      setMirroredImageUrl(canvas.toDataURL());
    };

    img.onerror = () => setMirroredImageUrl(MOTIF_URL);
  }, [totalWidth]);

  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current || !totalWidth || !maxHeight) return;

      const padding = 32;
      const { clientWidth, clientHeight } = containerRef.current;
      const availableWidth = clientWidth - padding;
      const availableHeight = clientHeight - padding;

      const scaleX = availableWidth / totalWidth;
      const scaleY = availableHeight / maxHeight;

      setScale(Math.min(scaleX, scaleY, 1));
    };

    calculateScale();
    const observer = new ResizeObserver(calculateScale);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [totalWidth, maxHeight]);

  let accumulatedWidth = 0;

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center p-4 bg-gray-100"
    >
      {plates.length === 0 ? (
        <div className="text-center text-gray-500 p-8">
          <div className="text-lg mb-2">No plates to display</div>
          <div className="text-sm">Add plates in the configuration panel</div>
        </div>
      ) : (
        <div
          className="transition-transform duration-300 origin-center overflow-auto mobile-scroll"
          style={{ transform: `scale(${scale})` }}
        >
          <div
            className="flex items-end relative"
            style={{ width: `${totalWidth}px`, height: `${maxHeight}px` }}
          >
            {plates.map((plate, index) => {
              const margin = index > 0 ? 5 : 0;
              accumulatedWidth += margin;
              const left = accumulatedWidth;
              accumulatedWidth += plate.width;

              return (
                <div
                  key={plate.id}
                  style={{
                    width: `${plate.width}px`,
                    height: `${plate.height}px`,
                    backgroundImage: `url(${mirroredImageUrl})`,
                    backgroundSize:
                      plates.length === 1 ? "cover" : `${totalWidth}px auto`,
                    backgroundPosition:
                      plates.length === 1 ? "center" : `-${left}px center`,
                    backgroundRepeat: "no-repeat",
                    imageRendering: "crisp-edges",
                    position: "relative",
                    display: "inline-block",
                    marginLeft: margin ? "5px" : "0",
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlateCanvas;
