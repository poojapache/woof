import PlaceIcon from "@mui/icons-material/Place";
interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  city?: string;
  state?: string;
}
export default function DogMatch({ dog }: { dog: Dog | null }) {
  if (!dog) {
    return <p>No dog found.</p>;
  }
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-4xl text-orange-500 font-bold p-2">
        Congratulations!
      </h2>
      <h2 className="text-3xl text-orange-500 font-bold p-2">
        You are matched with:
      </h2>
      <div className="flex justify-center flex-col">
        <div className="flex-1 w-full flex justify-center p-2">
          <img
            src={dog.img}
            alt={`${dog.name}`}
            className="h-60 w-60 flex-row justify-center"
          />
        </div>
        <div>
          <h1 className="text-2xl text-orange-500 font-bold">{`${dog.name}, (${dog.age})`}</h1>
        </div>
        <div className="w-full p-2 flex flex-row justify-center">
          <h1>{`Breed: ${dog.breed}`}</h1>
        </div>
        <div className="flex flex-row items-center w-full justify-center">
          <PlaceIcon className="text-xs mr-1 text-orange-500" />
          <h1 className="text-md w-fit">{`${dog.city || ""}, ${
            dog.state || ""
          }, ${dog.zip_code}`}</h1>
        </div>
      </div>
    </div>
  );
}
