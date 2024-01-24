import playBtn from '../assets/play.png';

function Backdrop({ icon }) {
  return (
    <div
      className={`${
        icon ? 'absolute' : 'fixed'
      } inset-0 z-40 flex h-full w-full items-center justify-center backdrop-blur-sm backdrop-brightness-50`}
    >
      {icon && (
        <img
          className="h-16 w-16"
          src={playBtn}
          alt="play button"
        />
      )}
    </div>
  );
}

export default Backdrop;
