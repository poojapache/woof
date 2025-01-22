import { Box, Paper } from "@mui/material";
import CustomAccordion from "../../components/accordion/CustomAccordion";
import BreedFilterDetails from "./customAccordionDetails/BreedFilterDetails";
import AgeFilterDetails from "./customAccordionDetails/AgeFilterDetails";
import LocationFilterDetails from "./customAccordionDetails/LocationFilterDetails";

export default function Filters(): JSX.Element {
  return (
    <Paper
      elevation={10}
      className="min-h-screen min-w-screen shadow-2xl bg-orange-500 flex flex-col justify-start max-w-1/4 p-4"
      sx={{
        backgroundColor: "#F97316",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box>
        <h1 className="text-3xl text-white font-bold">Filters</h1>
        <Box className={`flex flex-col justify-space p-2`}>
          <CustomAccordion
            title="Filter by Breed"
            component={<BreedFilterDetails />}
            filterName={"Breed"}
          />
          <CustomAccordion
            title="Filter by Location"
            component={<LocationFilterDetails />}
            filterName={"Location"}
          />
          <CustomAccordion
            title="Filter by Age"
            component={<AgeFilterDetails />}
            filterName={"Age"}
          />
        </Box>
      </Box>
    </Paper>
  );
}
