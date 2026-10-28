import pipeImage from "../assets/Pipe.png";

const Pipe = ({ x, gapTop, gapBottom, boardHeight }) => {
  return (
    <>
      {/* Top pipe */}
      <img
        src={pipeImage}
        alt="Top pipe"
        className="pipe pipe-top"
        draggable="false"
        style={{
          left: `${x}px`,
          top: "0px",
          height: `${gapTop}px`,
        }}
      />

      {/* Bottom pipe */}
      <img
        src={pipeImage}
        alt="Bottom pipe"
        className="pipe pipe-bottom"
        draggable="false"
        style={{
          left: `${x}px`,
          top: `${gapBottom}px`,
          height: `${boardHeight - gapBottom}px`,
        }}
      />
    </>
  );
};

export default Pipe;