import PlateCanvas from "./components/PlateCanvas";
import PlateControls from "./components/PlateControls";
import { usePlates } from "./hooks/usePlates";

function App() {
  const { plates, addPlate, removePlate, updatePlate } = usePlates();

  return (
    <div className="h-screen w-full flex flex-col font-sans overflow-hidden bg-white">
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="h-[60vh] md:h-full md:flex-1 min-h-0 mobile-scroll bg-gray-100">
          <PlateCanvas plates={plates} />
        </div>
        <div className="h-[40vh] md:h-full md:w-96 lg:w-1/3 xl:w-96 border-t md:border-l border-gray-300 min-h-0 mobile-scroll bg-white">
          <PlateControls
            plates={plates}
            addPlate={addPlate}
            removePlate={removePlate}
            updatePlate={updatePlate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
