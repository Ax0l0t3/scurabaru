import PropTypes from "prop-types";

export const ModalPassword = ({
  inputChange = Function.prototype,
  passwordValue,
}) => {
  return (
    <div className="bg-black absolute top-0 left-0 h-screen w-screen justify-center items-center flex z-50">
      <div className="flex items-center flex-col justify-center rounded-md bg-red-100 w-1/2 h-1/2">
        <h1 className="text-size-2xl text-[#331010]">PSWD</h1>
        <input
          placeholder="Five characters"
          className="rounded-full"
          onChange={inputChange}
          value={passwordValue}
        />
      </div>
    </div>
  );
};

ModalPassword.propTypes = {
  inputChange: PropTypes.func,
  passwordValue: PropTypes.string,
};
