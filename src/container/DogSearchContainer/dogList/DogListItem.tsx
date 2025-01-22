import { Paper } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PetsIcon from "@mui/icons-material/Pets";
import { useAtom } from "jotai";
import { selectedDogs } from "../../../globalStore/atom";
import Dog from "../../../interfaces/Dog";

export default function DogListItem({ dog }: { dog: Dog }): JSX.Element {
  const [selectedDogList, setSelectedDogList] = useAtom(selectedDogs);

  /*Function to handle slected dog item from list view */
  const isSelected = selectedDogList.some(
    (selectedDog) => selectedDog.id === dog.id
  );

  /*Function to handle checked/unchecked dog item */
  const handleClick = () => {
    if (isSelected) {
      setSelectedDogList((prevList) =>
        prevList.filter((selectedDog) => selectedDog.id !== dog.id)
      );
    } else {
      setSelectedDogList((prevList) => [...prevList, dog]);
    }
  };

  return (
    <div className="relative group w-full">
      <Paper
        elevation={10}
        onClick={handleClick}
        className={`overflow-hidden w-full group-hover:bg-cyan-400 group-hover:text-white group-hover:cursor-pointer ${
          isSelected ? "bg-cyan-400 text-white" : "bg-white"
        }`}
      >
        <div className="flex flex-row w-full justify-start flex-wrap">
          <img
            src={dog.img}
            alt={dog.name}
            className="h-24 w-24 p-2 m-2 object-cover"
          />
          <div className="flex-1 flex flex-col justify-start p-2 m-2 ml-0">
            <h1 className="text-2xl w-fit mb-1 font-bold">{dog.name}</h1>
            <div className="flex flex-row mb-2">
              <h1 className="text-sm w-fit mr-4">{`Age: ${dog.age}`}</h1>
              <h1 className="text-sm w-fit mr-2">{`Breed: ${dog.breed}`}</h1>
            </div>
            <div className="flex flex-row items-center">
              <PlaceIcon className="text-xs mr-1 text-orange-500" />
              <h1 className="text-sm w-fit">{`${dog.city || ""}, ${
                dog.state || ""
              }, ${dog.zip_code}`}</h1>
            </div>
          </div>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 text-orange-500">
            <PetsIcon className="text-md" />
          </div>
        )}
      </Paper>
    </div>
  );
}
