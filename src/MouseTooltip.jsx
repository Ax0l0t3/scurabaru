import PropTypes from "prop-types";

export const MouseTooltip = ({ mouseXY }) => {
  const anotherStyle = (mouseXY) => ({
    top: mouseXY.x,
    left: mouseXY.y,
  });

  return (
    <div
      className="flex w-auto h-auto absolute bg-[#cc2c2c]/50 z-50 rounded-full px-4 py-2 text-white"
      style={anotherStyle(mouseXY)}
    >
      <span>Selecciona una opción de la izquierda</span>
    </div>
  );
};

MouseTooltip.propTypes = {
  mouseXY: PropTypes.objectOf(PropTypes.number),
};
