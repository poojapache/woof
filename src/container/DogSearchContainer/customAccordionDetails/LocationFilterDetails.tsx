import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  cityFilter,
  error,
  errorMessage,
  filterCities,
  filterStates,
  selectedFilterCities,
  selectedFilterStates,
  zipCodes,
} from "../../../globalStore/atom";
import data from "../../../data/data.json";
import { locations } from "../../../api/endpoints/locations";
import Location from "../../../interfaces/Location";
import State from "../../../interfaces/State";

export default function LocationFilterDetails(): JSX.Element {
  const [states, setStates] = useAtom<State[]>(filterStates);
  const [cities, setCities] = useAtom<Location[]>(filterCities);
  const [selectedStates, setSelectedStates] =
    useAtom<string[]>(selectedFilterStates);
  const [selectedCities, setSelectedCities] =
    useAtom<string[]>(selectedFilterCities);
  const [, setSelectedZipCodes] = useAtom(zipCodes);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [, setErrorOcurred] = useAtom(error);
  const [, setErrorOcurredMsg] = useAtom(errorMessage);
  const [selectedCityFilter, setSelectedCityFilter] =
    useAtom<string>(cityFilter);

  const DEFAULT_SIZE = 25;

  /*Function to fetch state names with their abbreviation from data.json*/
  const fetchStates = async () => {
    try {
      const response = data as State[];
      setStates(response || []);
      return response;
    } catch (err: any) {
      setErrorOcurred(true);
      setErrorOcurredMsg(err);
      return err;
    }
  };

  /*Function to call the api fetch cities based on selected states */
  const fetchCities = async (
    stateFilters: string[],
    page: number,
    city: string = ""
  ) => {
    try {
      const response = await locations.searchLocation({
        states: stateFilters,
        city,
        size: DEFAULT_SIZE,
        from: page * DEFAULT_SIZE,
      });

      setCities((prevCities) =>
        page === 0
          ? response.results || []
          : [...prevCities, ...(response.results || [])]
      );
      setHasMore(response.results && response.results.length === DEFAULT_SIZE);
      return response;
    } catch (err: any) {
      setErrorOcurred(true);
      setErrorOcurredMsg(err);
      return err;
    }
  };

  /*Function to handle selected/unslected states */
  const handleStateChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    setSelectedStates(selected);
    setCities([]);
    setSelectedCities([]);
    setPage(0);
    setHasMore(true);
    if (selected.length > 0) {
      fetchCities(selected, 0);
    }
  };

  /*Function to handle changed city name in Text Fields */
  const handleCityFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSelectedCityFilter(value);
    setPage(0);
    if (selectedStates.length > 0) {
      fetchCities(selectedStates, 0, value);
    }
  };

  /*Function to handle checked/unchecked cities-zip_code combinations */
  const handleCityCheckboxChange = (zipCode: string, isChecked: boolean) => {
    const updatedCities = isChecked
      ? [...selectedCities, zipCode]
      : selectedCities.filter((code) => code !== zipCode);

    setSelectedCities(updatedCities);
    setSelectedZipCodes(updatedCities);
  };

  /*Function to show more cities/zip_codes if returned result has more than default_size count*/
  const handleShowMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchCities(selectedStates, newPage);
  };

  /*Initial call to fetch the states from data.json */
  useEffect(() => {
    fetchStates();
  });

  return (
    <>
      <div className="mb-2">
        <Typography variant="subtitle1">Select States</Typography>
        <Select
          multiple
          value={selectedStates}
          onChange={handleStateChange}
          fullWidth
          renderValue={(selected) => (selected as string[]).join(", ")}
        >
          {states.map((state, index) => (
            <MenuItem key={index} value={state.abbreviation}>
              {state.name} ({state.abbreviation}){" "}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="shadow-md p-2 mb-2">
        <Typography variant="subtitle1">Select Cities</Typography>
        <div className={`max-h-40 overflow-y-auto`}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter complete city name"
            value={selectedCityFilter}
            onChange={handleCityFilterChange}
          />
          <FormGroup>
            {selectedStates.length > 0 ? (
              cities.map((city, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedCities.includes(city.zip_code)}
                      onChange={(e) =>
                        handleCityCheckboxChange(
                          city.zip_code,
                          e.target.checked
                        )
                      }
                    />
                  }
                  label={`${city.city}, ${city.state}, ${city.zip_code}`}
                />
              ))
            ) : (
              <Typography color="textSecondary">
                Please select at least one state to load cities.
              </Typography>
            )}
          </FormGroup>
        </div>
        {selectedStates.length > 0 && cities.length > 0 && (
          <Button
            variant="text"
            color="primary"
            onClick={handleShowMore}
            disabled={!hasMore}
            className="w-full"
          >
            Show More
          </Button>
        )}
      </div>
    </>
  );
}
