import LandscapeIcon from "@mui/icons-material/Landscape";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import { MouseEventHandler } from "react";

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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.08)",
        width: "2.5rem",
        height: "2.5rem",
      }}
      onClick={onClick}
      aria-label="Swap Dimensions"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(0,0,0,0.54)",
          borderRadius: "0.15rem",
          width: `${height >= width ? "75%" : "95%"}`,
          height: `${height > width ? "95%" : "75%"}`,
        }}
      >
        {height >= width ? (
          <PersonIcon style={{ width: "100%" }} />
        ) : (
          <LandscapeIcon style={{ width: "100%" }} />
        )}
      </div>
    </IconButton>
  );
}
