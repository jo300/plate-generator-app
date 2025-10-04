import { Plus } from "lucide-react";
import PlateInput from "./PlateInput";
import { MAX_PLATES } from "../constants";

const PlateControls = ({ plates, addPlate, removePlate, updatePlate }) => {
  const isMaxPlates = plates.length >= MAX_PLATES;

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="shrink-0 p-4 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bold text-gray-800">
          <strong>Maße.</strong>Eingeben.
        </h2>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-4 space-y-2">
          {plates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No plates added yet. Click "Add New Plate" to start.
            </div>
          ) : (
            plates.map((plate, index) => (
              <PlateInput
                key={plate.id}
                plate={plate}
                plateIndex={index}
                onUpdate={updatePlate}
                onRemove={removePlate}
                isRemoveDisabled={plates.length <= 1}
                isLastPlate={index === plates.length - 1}
              />
            ))
          )}
        </div>
      </div>

      <div className="shrink-0 p-4 border-t border-gray-200 bg-white">
        <button
          onClick={addPlate}
          disabled={isMaxPlates}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-green-400 text-green-400 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Rückwand hinzufügen <Plus size={20} />
        </button>

        {isMaxPlates && (
          <p className="text-center text-xs text-gray-500 mt-2">
            Maximum of {MAX_PLATES} plates reached.
          </p>
        )}
      </div>
    </div>
  );
};

export default PlateControls;
