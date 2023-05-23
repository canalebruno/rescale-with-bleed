import ForestIcon from "@mui/icons-material/Forest";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import { MouseEventHandler } from "react";
import LandscapeIcon from "@mui/icons-material/Landscape";

interface SwapDimensionsButtonProps {
  width: number;
  height: number;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function SwapDimensionsButton({
  height,
  onClick,
  width,
}: SwapDimensionsButtonProps) {
  return (
    <IconButton
      style={{ backgroundColor: "rgba(0,0,0,0.08" }}
      onClick={onClick}
      aria-label="Swap Dimensions"
    >
      {height >= width ? <PersonIcon /> : <LandscapeIcon />}
    </IconButton>
  );
}
