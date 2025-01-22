import { ArrowDropDownCircleRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Button from "../buttons/Button";
import { useAtom } from "jotai";
import {
  ageRange,
  breeds,
  cityFilter,
  filterCities,
  filterStates,
  maxAge,
  minAge,
  selectedFilterCities,
  selectedFilterStates,
  zipCodes,
} from "../../globalStore/atom";

export default function CustomAccordion({
  title,
  component,
  filterName,
}: {
  title: string;
  component: React.ReactNode;
  filterName: string;
}): JSX.Element {
  const [, setDogBreeds] = useAtom(breeds);
  const [, setDogMinAge] = useAtom(minAge);
  const [, setDogMaxAge] = useAtom(maxAge);
  const [, setDogStates] = useAtom(filterStates);
  const [, setDogCities] = useAtom(filterCities);
  const [, setSelectedDogStates] = useAtom(selectedFilterStates);
  const [, setSelectedDogCities] = useAtom(selectedFilterCities);
  const [, setDogZipCodes] = useAtom(zipCodes);
  const [, setDogAgeRange] = useAtom(ageRange);
  const [, setSelectedCityFilter] = useAtom(cityFilter);

  /*Function to clear individual filters */
  const clearFilter = () => {
    switch (filterName) {
      case "Breed":
        setDogBreeds([]);
        break;
      case "Age":
        setDogMinAge(0);
        setDogMaxAge(100);
        setDogAgeRange([0, 100]);
        break;
      case "Location":
        setDogCities([]);
        setDogStates([]);
        setSelectedCityFilter("");
        setSelectedDogCities([]);
        setSelectedDogStates([]);
        setDogZipCodes([]);
        break;
      default:
        console.warn(`Unknown filterName: ${filterName}`);
        break;
    }
  };

  return (
    <div className="p-2">
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownCircleRounded />}
          aria-controls="panel2-content"
          id="panel2-header"
          className="shadow-md"
        >
          <Typography component="span" sx={{ fontWeight: "600" }}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="max-h-60 overflow-y-auto">
          <>
            {component}
            <div className="w-full flex justify-center p-2">
              <Button
                title="Clear Filter"
                onClick={clearFilter}
                disabled={false}
              />
            </div>
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
