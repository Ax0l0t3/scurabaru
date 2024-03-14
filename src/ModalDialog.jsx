import { DownloadMap } from "./assets/downloadMap.jsx";
import "./styles/modal.css";

export const ModalDialog = () => {
  return (
    <div className="bg-black/50 z-50 absolute top-0 left-0 w-screen h-screen font-['erika']">
      <div className="flex items-center flex-col justify-around rounded-md bg-red-100 w-1/2 h-1/2 mt-[12%] ml-[25%]">
        <h1 className="text-2xl">FELICIDADES!!</h1>
        <div className="flex mx-4">
          <img
            className="w-1/2 h-auto"
            src="src/assets/cuartoSvg.png"
            alt="Cuarto Drawing .jpg"
          />
          <div className="flex items-center justify-center flex-col w-1/2">
            <p className="text-center">Excelente huitlaconcha</p>
            <p className="pt-4 text-center">
              Tan inteligente como siempre. Podrás adivinar que es lo que sigue ahora?
            </p>
          </div>
        </div>
        <a
          href="/src/assets/cuartoDrawing.jpg"
          download="treasure-map"
          className="download-map"
        >
          <DownloadMap />
        </a>
      </div>
    </div>
  );
};
