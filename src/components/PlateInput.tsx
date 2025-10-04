import { useState, useEffect } from "react";
import { Minus } from "lucide-react";
import {
  MIN_WIDTH_CM,
  MAX_WIDTH_CM,
  MIN_HEIGHT_CM,
  MAX_HEIGHT_CM,
} from "../constants";
import { parseLocaleNumber } from "../utils/localization";

const PlateInput = ({
  plate,
  plateIndex,
  onUpdate,
  onRemove,
  isRemoveDisabled,
  isLastPlate,
}) => {
  const [widthInput, setWidthInput] = useState(String(plate.width));
  const [heightInput, setHeightInput] = useState(String(plate.height));
  const [errors, setErrors] = useState({ width: null, height: null });

  useEffect(() => {
    setWidthInput(String(plate.width));
    setHeightInput(String(plate.height));
  }, [plate.width, plate.height]);

  const validate = (value, type) => {
    const parsed = parseLocaleNumber(value);
    const [min, max] =
      type === "width"
        ? [MIN_WIDTH_CM, MAX_WIDTH_CM]
        : [MIN_HEIGHT_CM, MAX_HEIGHT_CM];

    if (parsed === null && value.trim()) {
      return "Invalid number format";
    }
    if (parsed !== null && (parsed < min || parsed > max)) {
      return `Must be between ${min} and ${max}`;
    }
    return null;
  };

  const handleBlur = (type, e) => {
    const value = e.target.value;
    const error = validate(value, type);

    if (error) {
      setErrors((prev) => ({ ...prev, [type]: error }));
      if (type === "width") setWidthInput(String(plate.width));
      if (type === "height") setHeightInput(String(plate.height));
    } else {
      setErrors((prev) => ({ ...prev, [type]: null }));
      const parsed = parseLocaleNumber(value);
      if (parsed !== null) onUpdate(plate.id, { [type]: parsed });
    }
  };

  const handleChange = (type, e) => {
    const value = e.target.value;
    if (type === "width") setWidthInput(value);
    else setHeightInput(value);

    setErrors((prev) => ({ ...prev, [type]: validate(value, type) }));
  };

  const inputClass =
    "w-full px-2 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 mobile-input bg-white";

  return (
    <div
      className={`flex items-center justify-center gap-2 p-2 rounded-lg transition-all duration-200 origin-left ${
        isLastPlate ? "border-gray-300 shadow-sm bg-red-50" : "border-gray-200"
      }`}
      style={{ backgroundColor: "#f5f5f7" }}
    >
      <div
        className={`flex-shrink-0 w-6 h-6 border-2 border-black rounded-md flex items-center justify-center text-xs font-medium ${
          isLastPlate
            ? "bg-gray-900 text-white font-extrabold"
            : "text-gray-600"
        }`}
      >
        {plateIndex + 1}
      </div>

      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            {isLastPlate ? "Breite" : " "}
          </label>
          <input
            type="text"
            value={widthInput}
            onChange={(e) => handleChange("width", e)}
            onBlur={(e) => handleBlur("width", e)}
            className={`${inputClass} ${
              errors.width ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.width && (
            <p className="text-xs text-red-500 mt-1">{errors.width}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-600 mb-1">
            {isLastPlate ? "Höhe" : " "}
          </label>
          <input
            type="text"
            value={heightInput}
            onChange={(e) => handleChange("height", e)}
            onBlur={(e) => handleBlur("height", e)}
            className={`${inputClass} ${
              errors.height ? "border-red-400" : "border-gray-300"
            }`}
          />
          {errors.height && (
            <p className="text-xs text-red-500 mt-1">{errors.height}</p>
          )}
        </div>
      </div>

      <button
        onClick={() => onRemove(plate.id)}
        disabled={isRemoveDisabled}
        className="flex-shrink-0 w-6 h-6 rounded-full bg-red-200 flex items-center justify-center text-gray-500 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors mobile-touch"
        aria-label={`Remove Plate ${plateIndex + 1}`}
      >
        <Minus size={14} />
      </button>
    </div>
  );
};

export default PlateInput;
