import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ButtomSvg } from "./assets/buttomSvg.jsx";
import { TopSvg } from "./assets/topSvg.jsx";
import { RightArrow } from "./assets/arrowSvg.jsx";
import {
  aditivoWord,
  asWord,
  axolozebrasWord,
  disterenteWord,
  epazoteWord,
  fantabulosaWord,
  pronombresWord,
  rapositaWord,
  sorpresaWord,
  traviesoWord,
} from "./utils/constants.jsx";
import "./styles/app.css";
import { ModalDialog } from "./ModalDialog.jsx";
import { ModalPassword } from "./ModalPassword.jsx";
import { MouseTooltip } from "./MouseTooltip.jsx";

function App() {
  let gridPoints = [];
  const sortedAnswers = {
    0: aditivoWord,
    1: traviesoWord,
    2: sorpresaWord,
    3: disterenteWord,
    4: fantabulosaWord,
    5: pronombresWord,
    6: axolozebrasWord,
    7: rapositaWord,
    8: asWord,
    9: epazoteWord,
  };
  const [inputsIds, setInputsIds] = useState([]);
  const [displayInputs, setDisplayInputs] = useState([]);
  const [cleanInputs, setCleanInputs] = useState([]);
  const [selectedObject, setSelectedObject] = useState({});
  const [highlightedObject, setHighlightedObject] = useState([]);
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
  const [mouseInDiv, setMouseInDiv] = useState(false);
  const [answersState, setAnswersState] = useState(false);
  const [wrongCharsIds, setWrongCharsIds] = useState([]);
  const [solved, setSolved] = useState(false);
  const [passWord, setPassword] = useState("");
  const buttonLabels = [
    "Sustantivo para añadir o mejorar cualidades",
    "Niño inquieto con cierto ingenio",
    "Pasmo, detalle",
    "Único",
    "Surreal, magnífica",
    "Tu y yo",
    "Un tiburón de la mano del otro",
    "Tribu: Vulpini",
    "Moneda primitiva romana",
    "Planta indígena mexicana",
  ];

  const gridStyling = (col, row, selected, backgroundString) => ({
    backgroundColor: backgroundString || "white",
    border: selected ? "3px solid #ccaa2d" : "3px solid #785598",
    borderRadius: "5px",
    cursor: "default",
    height: "100%",
    gridColumnStart: col,
    gridRowStart: row,
    width: "100%",
    textAlign: "center",
    textTransform: "uppercase",
    transition: "all 0.2s",
  });

  const coordinatesArray = ({ word, direction, column, row }, border) => {
    let arr1 = inputsIds.length === 0 ? [...gridPoints] : [...cleanInputs];
    // direction 0 = vertical
    // direction 1 = horizontal
    if (direction === 0) {
      for (let i = 0; i < word.length; i++) {
        arr1.push(`${column},${i + row}${border ? ",b" : ""}`);
      }
    }
    if (direction === 1) {
      for (let i = 0; i < word.length; i++) {
        arr1.push(`${i + column},${row}${border ? ",b" : ""}`);
      }
    }
    inputsIds.length === 0 ? (gridPoints = arr1) : setInputsIds(arr1);
  };

  const handleRadioClick = (e) => {
    const answerObject = sortedAnswers[buttonLabels.indexOf(e.target.value)];
    coordinatesArray({ ...answerObject }, true);
    setSelectedObject(answerObject);
    const targetId = `${answerObject.column},${answerObject.row}`;
    const targetElement = document.getElementById(targetId);
    const focusElement = document.getElementById(`${targetId},b`);
    if (targetElement) {
      targetElement.focus();
      return;
    }
    focusElement.focus();
  };

  const handleInputChange = (e) => {
    const [col, row] = e.target.id.split(",", 2);
    let colNumber = parseInt(col);
    let rowNumber = parseInt(row);
    if (selectedObject.direction === 0) rowNumber++;
    if (selectedObject.direction === 1) colNumber++;
    const focusElement = document.getElementById(`${colNumber},${rowNumber},b`);
    if (focusElement) {
      focusElement.focus();
    } else {
      document
        .getElementById(`${selectedObject.column},${selectedObject.row},b`)
        .focus();
    }
    if (e.target.value.length > 1) e.target.value = e.target.value.at(1);
  };

  const handleMouseEnter = (e) => {
    const answerObject = sortedAnswers[buttonLabels.indexOf(e.target.id)];
    let { word, direction, column, row } = answerObject;
    let highlightedInputs = [];
    for (let k in word) {
      if (direction === 0) {
        highlightedInputs.push(`${column},${row}`);
        row++;
      }
      if (direction === 1) {
        highlightedInputs.push(`${column},${row}`);
        column++;
      }
    }
    const charsToCorrect = wrongCharsIds.filter(
      (coordinate) => !highlightedInputs.includes(coordinate),
    );
    setHighlightedObject(highlightedInputs);
    setWrongCharsIds(charsToCorrect);
  };

  const handleMouseLeave = () => {
    setHighlightedObject([]);
  };

  const handleDivMouseOver = (e) => {
    const localX = e.clientY;
    const localY = e.clientX;
    setMouseInDiv(true);
    setMouseCoordinates({ x: localX, y: localY });
  };

  const handleDivMouseOut = () => {
    setMouseInDiv(false);
  };

  const submitAnswers = () => {
    // We erase the border
    for (let k in sortedAnswers) {
      coordinatesArray({ ...sortedAnswers[k] }, false);
    }
    setAnswersState(true);
  };

  const passwordChange = (e) => setPassword(e.target.value.toUpperCase());

  useEffect(() => {
    gridPoints = [];
    for (let k in sortedAnswers) {
      coordinatesArray({ ...sortedAnswers[k] }, false);
    }
    setCleanInputs(gridPoints);
    setInputsIds(gridPoints);
  }, []);

  useEffect(() => {
    let limpieza = [...inputsIds];
    limpieza.sort();
    for (let c = 1; c < limpieza.length; c++) {
      const spliced = limpieza[c].split(/,b/, 1);
      if (spliced[0] === limpieza[c - 1]) {
        limpieza.splice(c - 1, 1);
      }
    }
    for (let c = 1; c < limpieza.length; c++) {
      const spliced = limpieza[c].split(/,b/, 1);
      if (spliced[0] === limpieza[c - 1]) {
        limpieza.splice(c - 1, 1);
      }
    }
    setDisplayInputs(limpieza);
  }, [inputsIds]);

  useEffect(() => {
    if (answersState) {
      let wrongCharArray = [];
      for (let i in sortedAnswers) {
        let { word, direction, column, row } = { ...sortedAnswers[i] };
        [...word].map((char) => {
          const input = document.getElementById(`${column},${row}`);
          if (char !== input.value.toLowerCase()) {
            wrongCharArray.push(`${column},${row}`);
          }
          if (direction === 0) row++;
          if (direction === 1) column++;
        });
      }
      wrongCharArray.length > 0
        ? setWrongCharsIds(wrongCharArray)
        : setSolved(true);
    }
    setAnswersState(false);
  }, [displayInputs]);

  return (
    <div className="snow-background">
      {passWord !== "B3M14"
        ? createPortal(
            <ModalPassword
              inputChange={passwordChange}
              passwordValue={passWord}
            />,
            document.body,
          )
        : null}
      {solved && createPortal(<ModalDialog />, document.body)}
      <TopSvg />
      <button
        className="review-answers bg-[#c7eef0] hover:bg-[#ccaa2d]"
        type="button"
        onClick={submitAnswers}
      >
        <RightArrow />
      </button>
      <div className="flex h-full">
        {/*Form Div */}
        <div className="flex flex-col justify-around w-1/2 h-full py-14 pl-28 items-start">
          {buttonLabels.map((element, index) => (
            <label className="answer-selector px-4" key={index}>
              <input
                className="radio-input"
                type="radio"
                name="answer"
                value={element}
                onChange={handleRadioClick}
              />
              <span
                id={element}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {element}
              </span>
            </label>
          ))}
        </div>
        {/*Game Canvas Div */}
        <div
          className="w-1/2 bg-[#231e1e] rounded-2xl my-14 mr-6 game-grid"
          onMouseMove={handleDivMouseOver}
          onMouseOut={handleDivMouseOut}
        >
          {mouseInDiv && <MouseTooltip mouseXY={mouseCoordinates} />}
          {displayInputs.map((element, index) => {
            const [colNumber, rowNumber, border] = element.split(",");
            const forCoincidence = element.split(/,b/, 1);
            const isHighlight =
              highlightedObject.includes(forCoincidence[0]) && "#fcdea2";
            const isWrong =
              wrongCharsIds.includes(forCoincidence[0]) && "#d35f5f";
            const elString = isHighlight || isWrong;
            return (
              <input
                id={element}
                key={index}
                style={gridStyling(colNumber, rowNumber, border, elString)}
                onChange={handleInputChange}
              />
            );
          })}
        </div>
      </div>
      <ButtomSvg />
    </div>
  );
}

export default App;
