import { useEffect, useState } from "react";
import { dogs } from "../../../api/endpoints/dogs";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useAtom } from "jotai";
import { breeds, error, errorMessage } from "../../../globalStore/atom";

export default function BreedFilterDetails(): JSX.Element {
  const [breedList, setBreedList] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useAtom(breeds);
  const [, setErrorOcurred] = useAtom(error);
  const [, setErrorOcurredMsg] = useAtom(errorMessage);

  /*Function to get dog breeds */
  useEffect(() => {
    /*Calls api to get dog breeds */
    dogs
      .getBreeds()
      .then((res: any) => {
        setBreedList(res);
        return res;
      })
      .catch((err) => {
        setErrorOcurred(true);
        setErrorOcurredMsg(err);
        return err;
      });
  }, [setErrorOcurred, setErrorOcurredMsg]);

  /*Function to filter dogs based on checked breeds */
  const handleCheckboxChange = (breed: string) => {
    setSelectedBreeds((prev: any) =>
      prev.includes(breed)
        ? prev.filter((item: any) => item !== breed)
        : [...prev, breed]
    );
  };

  return (
    <div className="h-40 overflow-y-auto">
      <FormGroup>
        {breedList.map((breed, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedBreeds.includes(breed)}
                onChange={() => handleCheckboxChange(breed)}
              />
            }
            label={breed}
          />
        ))}
      </FormGroup>
    </div>
  );
}
