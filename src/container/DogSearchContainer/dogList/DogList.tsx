import DogListItem from "./DogListItem";
import Dog from "../../../interfaces/Dog";

export default function DogList({ dogList }: { dogList: Dog[] }): JSX.Element {
  return (
    <div className="p-2 overflow-y-auto flex justify-center w-full h-full shadow-inner border-4 bg-white border-orange-500">
      <div className="flex flex-row flex-wrap justify-start h-fit p-10 gap-8 max-w-full">
        {dogList.map((dog) => (
          <DogListItem dog={dog} key={dog.id} />
        ))}
      </div>
    </div>
  );
}
