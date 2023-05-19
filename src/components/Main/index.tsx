import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { TextField } from "@mui/material";
import StandardPaperSelection from "../StandardPaperSelect";

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
        return (
          paper.width === currentPageFinishSize.width &&
          paper.height === currentPageFinishSize.height
        );
      } else {
        return (
          paper.width === newPageFinishSize.width &&
          paper.height === newPageFinishSize.height
        );
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

  return (
    <main className={styles.container}>
      <h1>Rescaling with Bleed</h1>
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
          <button onClick={(e) => swapDimensions("currentWithBleed")}>
            Portrait to Landscape
          </button>
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
          <button onClick={(e) => swapDimensions("currentPage")}>
            Portrait to Landscape
          </button>
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
          <button onClick={(e) => swapDimensions("newPage")}>
            Portrait to Landscape
          </button>
        </div>
      </label>
      <label>
        <span>Rescale to</span>
        <div className={styles.resultInputContainer}>
          <TextField
            label="Width"
            size="small"
            type="number"
            value={rescaleTo.width.toFixed(2)}
            disabled
          />
          <TextField
            label="Height"
            size="small"
            type="number"
            value={rescaleTo.height.toFixed(2)}
            disabled
          />
        </div>
      </label>
      <label>
        <span>Trimbox Sizes</span>
        <div className={styles.resultInputContainer}>
          <TextField
            label="Left & Right"
            size="small"
            type="number"
            value={trimboxSize.width.toFixed(2)}
            disabled
          />
          <TextField
            label="Top & Bottom"
            size="small"
            type="number"
            value={trimboxSize.height.toFixed(2)}
            disabled
          />
        </div>
      </label>
    </main>
  );
}
