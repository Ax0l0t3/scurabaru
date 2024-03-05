import { useState, useEffect } from "react";
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
import "./app.css";

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

  const gridStyling = (col, row, selected, highlighted) => ({
    backgroundColor: highlighted ? "#FCDEA2" : "white",
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

  const anotherStyle = (mouseCoordinates) => ({
    top: mouseCoordinates.x,
    left: mouseCoordinates.y,
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
    let arrTemp = [];
    for (let k in word) {
      if (direction === 0) {
        arrTemp.push(`${column},${row}`);
        row++;
      }
      if (direction === 1) {
        arrTemp.push(`${column},${row}`);
        column++;
      }
    }
    setHighlightedObject(arrTemp);
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

  console.log("Render App");

  return (
    <div className="snow-background">
      <TopSvg />
      <button
        className="review-answers bg-[#c7eef0] hover:bg-[#ccaa2d]"
        type="button"
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
          {mouseInDiv && (
            <div
              className="flex w-auto h-auto absolute bg-[#cc2c2c]/50 z-50 rounded-full px-4 py-2 text-white"
              style={anotherStyle(mouseCoordinates)}
            >
              <span>Selecciona una opción de la izquierda</span>
            </div>
          )}
          {displayInputs.map((element, index) => {
            const [colNumber, rowNumber, border] = element.split(",");
            const forCoincidence = element.split(/,b/, 1);
            const isCoincidence = highlightedObject.includes(forCoincidence[0]);
            return (
              <input
                id={element}
                key={index}
                style={gridStyling(colNumber, rowNumber, border, isCoincidence)}
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
