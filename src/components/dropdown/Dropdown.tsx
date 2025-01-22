import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAtom } from "jotai";
import { page, sort } from "../../globalStore/atom";

export default function Dropdown(): JSX.Element {
  const [currentSort, setCurrentSort] = useAtom(sort);
  const [, setCurrentPage] = useAtom(page);

  const handleChange = (event: SelectChangeEvent) => {
    const newSortValue = event.target.value;
    setCurrentSort(newSortValue);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      <FormControl
        className="float-right"
        sx={{
          m: 1,
          minWidth: 120,
          "& .MuiFormLabel-root": {
            color: "#F97316",
            borderColor: "#F97316",
          },
          "& .MuiFocused": {
            color: "#F97316",
            borderColor: "#F97316",
          },
        }}
      >
        <InputLabel id="dropdown">Sort by</InputLabel>
        <Select
          labelId="dropdown-helper-label"
          id="dropdown-helper"
          value={currentSort}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"breed:asc"}>Breed (A to Z)</MenuItem>
          <MenuItem value={"breed:desc"}>Breed (Z to A)</MenuItem>
          <MenuItem value={"name:asc"}>Name (A to Z)</MenuItem>
          <MenuItem value={"name:desc"}>Name (Z to A)</MenuItem>
          <MenuItem value={"age:asc"}>Age (Min to Max)</MenuItem>
          <MenuItem value={"age:desc"}>Age (Max to Min)</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
