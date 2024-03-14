export const ModalDialog = () => {
  return (
    <div className="bg-black/50 z-50 absolute top-0 left-0 flex items-center justify-center w-screen h-screen font-['erika']">
      <div className="flex items-center flex-col pt-4 rounded-md bg-red-100 w-1/2 h-1/2">
        <h1 className="text-2xl">FELICIDADES!!</h1>
        <div className="flex mx-4 pt-8">
          <div className="w-1/2 flex items-center justify-center">
            <img src="src/assets/next_hint.png" alt="Cuarto Drawing .jpg" />
          </div>
          <div className="flex items-center justify-center flex-col w-1/2">
            <p className="text-center">Excelente huitlaconcha</p>
            <p className="pt-4 text-center">
              Tan inteligente como siempre. Podrás adivinar que es lo que sigue
              ahora?
            </p>
            <p className="pt-4 text-center">ascii-code.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
