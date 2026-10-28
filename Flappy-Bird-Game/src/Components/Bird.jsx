// import flappyBird from "../assets/flappy_bird_by_Aditya_.gif";

// const Bird = ({ birdPosition }) => {
//   return (
//     <img
//       src={flappyBird}
//       alt="Flappy Bird"
//       className="bird"
//       style={{
//         left: birdPosition.x,
//         top: birdPosition.y,
//       }}
//       draggable={true}
//     />
//   );
// };

// export default Bird;
import flappyBird from "../assets/flappy_bird_by_Aditya_.gif";

const Bird = ({ birdPosition }) => {
  return (
    <img
      src={flappyBird}
      alt="Flappy Bird"
      className="bird"
      style={{ top: `${birdPosition}px` }}
    />
  );
};

export default Bird;