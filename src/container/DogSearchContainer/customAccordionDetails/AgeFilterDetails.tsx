import { Box, Slider, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { minAge, maxAge, ageRange } from "../../../globalStore/atom";

export default function AgeFilterDetails(): JSX.Element {
  const [dogAgeRange, setDogAgeRange] = useAtom<number[]>(ageRange);
  const [, setDogMinAge] = useAtom(minAge);
  const [, setDogMaxAge] = useAtom(maxAge);

  /*Function to set min/max age when age slider is changed */
  const handleAgeChange = (event: Event, newValue: number[]) => {
    setDogMinAge(newValue[0]);
    setDogMaxAge(newValue[1]);
    setDogAgeRange(newValue);
  };

  return (
    <Box padding={2}>
      <Typography variant="h6" gutterBottom>
        Select Age Range
      </Typography>
      <Slider
        value={dogAgeRange}
        onChange={(event, newValue) =>
          handleAgeChange(event, newValue as number[])
        }
        valueLabelDisplay="auto"
        min={0}
        max={100}
        step={1}
        marks={[
          { value: 0, label: "0" },
          { value: 100, label: "100" },
        ]}
        sx={{
          color: "#F97316",
        }}
      />
      <Typography>
        Selected Range: {dogAgeRange[0]} - {dogAgeRange[1]} years
      </Typography>
    </Box>
  );
}
