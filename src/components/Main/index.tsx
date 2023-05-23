import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { TextField } from "@mui/material";
import StandardPaperSelection from "../StandardPaperSelect";
import SwapDimensionsButton from "../SwapDimensionsButton";

export default function Main() {
  const [currentPageWithBleed, setCurrentPageWithBleed] = useState({
    width: 1,
    height: 1,
  });
  const [currentPageFinishSize, setCurrentPageFinishSize] = useState({
    width: 1,
    height: 1,
  });
  const [newPageFinishSize, setNewPageFinishSize] = useState({
    width: 1,
    height: 1,
  });
  const [rescaleTo, setRescaleTo] = useState({ width: 1, height: 1 });
  const [trimboxSize, setTrimboxSize] = useState({ width: 1, height: 1 });
  const [currentPageSelection, setCurrentPageSelection] = useState("custom");
  const [newPageSelection, setNewPageSelection] = useState("custom");

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

  useEffect(() => {
    setRescaleTo({
      width:
        (currentPageWithBleed.width * newPageFinishSize.width) /
        currentPageFinishSize.width,
      height:
        (currentPageWithBleed.height * newPageFinishSize.height) /
        currentPageFinishSize.height,
    });
    setTrimboxSize({
      width: (rescaleTo.width - newPageFinishSize.width) / 2,
      height: (rescaleTo.height - newPageFinishSize.height) / 2,
    });
  }, [
    currentPageWithBleed,
    newPageFinishSize,
    currentPageFinishSize,
    rescaleTo,
  ]);

  useEffect(() => {
    lookForStandardPaper("currentPage");
  }, [currentPageFinishSize]);

  useEffect(() => {
    lookForStandardPaper("newPage");
  }, [newPageFinishSize]);

  function handleSelect(selectOption: string, optionValue: string) {
    if (optionValue === "custom") {
      return;
    }

    const selectedPaper = standardSizes.find(
      (paper) => paper.name === optionValue
    );

    if (!selectedPaper) {
      return;
    }
    if (selectOption === "currentPage") {
      setCurrentPageFinishSize({
        width: selectedPaper.width,
        height: selectedPaper.height,
      });
    } else if (selectOption === "newPage") {
      setNewPageFinishSize({
        width: selectedPaper.width,
        height: selectedPaper.height,
      });
    }
  }

  function lookForStandardPaper(selector: string) {
    const selectedPaper = standardSizes.find((paper) => {
      if (selector === "currentPage") {
        if (currentPageFinishSize.width <= currentPageFinishSize.height) {
          return (
            paper.width === currentPageFinishSize.width &&
            paper.height === currentPageFinishSize.height
          );
        } else {
          return (
            paper.width === currentPageFinishSize.height &&
            paper.height === currentPageFinishSize.width
          );
        }
      } else {
        if (newPageFinishSize.width <= newPageFinishSize.height) {
          return (
            paper.width === newPageFinishSize.width &&
            paper.height === newPageFinishSize.height
          );
        } else {
          return (
            paper.width === newPageFinishSize.height &&
            paper.height === newPageFinishSize.width
          );
        }
      }
    });

    if (!selectedPaper) {
      if (selector === "currentPage") {
        setCurrentPageSelection("custom");
      } else {
        setNewPageSelection("custom");
      }
      return;
    }

    if (selector === "currentPage") {
      setCurrentPageSelection(selectedPaper.name);
    } else {
      setNewPageSelection(selectedPaper.name);
    }
  }

  function swapDimensions(sizeToSwap: string) {
    if (sizeToSwap === "currentWithBleed") {
      setCurrentPageWithBleed({
        width: currentPageWithBleed.height,
        height: currentPageWithBleed.width,
      });
    } else if (sizeToSwap === "currentPage") {
      setCurrentPageFinishSize({
        width: currentPageFinishSize.height,
        height: currentPageFinishSize.width,
      });
    } else if (sizeToSwap === "newPage") {
      setNewPageFinishSize({
        width: newPageFinishSize.height,
        height: newPageFinishSize.width,
      });
    }
  }

  function formatNumber(number: number) {
    if (Number.isInteger(number)) {
      return number.toFixed(0);
    } else {
      const stringNumber = number.toFixed(2);
      if (stringNumber[stringNumber.length - 1] === "0") {
        return stringNumber.slice(0, -1);
      } else {
        return stringNumber;
      }
    }
  }

  return (
    <main className={styles.container}>
      <h1>Scaling Documents with Bleed</h1>
      <label>
        <span>Current Page Size with Bleed</span>
        <div className={styles.inputContainer}>
          <TextField
            label="Width"
            size="small"
            type="number"
            value={currentPageWithBleed.width}
            onChange={(e) =>
              setCurrentPageWithBleed({
                ...currentPageWithBleed,
                width: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Height"
            size="small"
            type="number"
            value={currentPageWithBleed.height}
            onChange={(e) =>
              setCurrentPageWithBleed({
                ...currentPageWithBleed,
                height: Number(e.target.value),
              })
            }
          />
          <SwapDimensionsButton
            height={currentPageWithBleed.height}
            width={currentPageWithBleed.width}
            onClick={(e) => swapDimensions("currentWithBleed")}
          />
        </div>
      </label>
      <label>
        <div className={styles.inputHeaderContainer}>
          <span>Current Page Finish Size</span>
          <StandardPaperSelection
            value={currentPageSelection}
            onChange={(event) => {
              handleSelect("currentPage", event.target.value);
              setCurrentPageSelection(event.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            label="Width"
            size="small"
            type="number"
            value={currentPageFinishSize.width}
            onChange={(e) => {
              setCurrentPageFinishSize({
                ...currentPageFinishSize,
                width: Number(e.target.value),
              });
            }}
          />
          <TextField
            label="Height"
            size="small"
            type="number"
            value={currentPageFinishSize.height}
            onChange={(e) => {
              setCurrentPageFinishSize({
                ...currentPageFinishSize,
                height: Number(e.target.value),
              });
            }}
          />
          <SwapDimensionsButton
            height={currentPageFinishSize.height}
            width={currentPageFinishSize.width}
            onClick={(e) => swapDimensions("currentPage")}
          />
        </div>
      </label>
      <label>
        <div className={styles.inputHeaderContainer}>
          <span>New Finish Size</span>
          <StandardPaperSelection
            value={newPageSelection}
            onChange={(event) => {
              handleSelect("newPage", event.target.value);
              setNewPageSelection(event.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <TextField
            label="Width"
            size="small"
            type="number"
            value={newPageFinishSize.width}
            onChange={(e) => {
              setNewPageFinishSize({
                ...newPageFinishSize,
                width: Number(e.target.value),
              });
            }}
          />
          <TextField
            label="Height"
            size="small"
            type="number"
            value={newPageFinishSize.height}
            onChange={(e) => {
              setNewPageFinishSize({
                ...newPageFinishSize,
                height: Number(e.target.value),
              });
            }}
          />
          <SwapDimensionsButton
            height={newPageFinishSize.height}
            width={newPageFinishSize.width}
            onClick={(e) => swapDimensions("newPage")}
          />
        </div>
      </label>
      <div className={styles.divider} />
      <label>
        <span>Rescale to</span>
        <div className={styles.resultInputContainer}>
          <TextField
            label="Width"
            size="small"
            value={
              currentPageWithBleed.width < currentPageFinishSize.width
                ? "BLEED SIZE ERROR"
                : formatNumber(rescaleTo.width)
            }
            disabled
          />
          <TextField
            label="Height"
            size="small"
            value={
              currentPageWithBleed.height < currentPageFinishSize.height
                ? "BLEED SIZE ERROR"
                : formatNumber(rescaleTo.height)
            }
            disabled
          />
        </div>
      </label>
      <label>
        <span>Trimbox Values</span>
        <div className={styles.resultInputContainer}>
          <TextField
            label="Left & Right"
            size="small"
            value={
              currentPageWithBleed.width < currentPageFinishSize.width
                ? "BLEED SIZE ERROR"
                : formatNumber(trimboxSize.width)
            }
            disabled
          />
          <TextField
            label="Top & Bottom"
            size="small"
            value={
              currentPageWithBleed.height < currentPageFinishSize.height
                ? "BLEED SIZE ERROR"
                : formatNumber(trimboxSize.height)
            }
            disabled
          />
        </div>
      </label>
    </main>
  );
}
