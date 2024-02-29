import { useState, useEffect } from "react";
import { ButtomSvg } from "./assets/buttomSvg.jsx";
import { TopSvg } from "./assets/topSvg.jsx";
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

  const gridStyling = (col, row, highlighted) => ({
    backgroundColor: "white",
    borderRadius: "5px",
    height: "100%",
    width: "100%",
    gridColumnStart: col,
    gridRowStart: row,
    border: highlighted ? "3px solid #ccaa2d" : "3px solid #785598",
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
  };

  const handleInputChange = (e) => {
    console.log(e.target);
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

  return (
    <div className="snow-background">
      <TopSvg />
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
              <span>{element}</span>
            </label>
          ))}
        </div>
        {/*Game Canvas Div */}
        <div className="w-1/2 bg-[#231e1e] rounded-2xl my-14 mr-6 game-grid">
          {displayInputs.map((elemento, index) => {
            const [colNumber, rowNumber, border] = elemento.split(",");
            return (
              <input
                id={elemento}
                key={index}
                style={gridStyling(colNumber, rowNumber, border)}
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