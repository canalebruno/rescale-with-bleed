import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactNode } from "react";

interface StandardPaperSelectionProps {
  value: string;
  onChange?:
    | ((event: SelectChangeEvent<any>, child: ReactNode) => void)
    | undefined;
}

export default function StandardPaperSelection({
  value,
  onChange,
}: StandardPaperSelectionProps) {
  const standardSizes = [
    {
      name: "A0",
      width: 841,
      height: 1189,
    },
    {
      name: "A1",
      width: 594,
      height: 841,
    },
    {
      name: "A2",
      width: 420,
      height: 594,
    },
    {
      name: "A3",
      width: 297,
      height: 420,
    },
    {
      name: "A4",
      width: 210,
      height: 297,
    },
    {
      name: "A5",
      width: 148,
      height: 210,
    },
    {
      name: "A6",
      width: 105,
      height: 148,
    },
    {
      name: "A7",
      width: 74,
      height: 105,
    },
    {
      name: "DL",
      width: 99,
      height: 210,
    },
  ];

  return (
    <FormControl size="small" style={{ flex: 1 }}>
      <InputLabel id="Standard-paper-size-selection">Paper Size</InputLabel>
      <Select
        labelId="Standard-paper-size-selection"
        value={value}
        label="Paper Size"
        onChange={onChange}
      >
        <MenuItem value="custom">Custom</MenuItem>
        {standardSizes.map((paper) => {
          return (
            <MenuItem key={paper.name} value={paper.name}>
              {paper.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
