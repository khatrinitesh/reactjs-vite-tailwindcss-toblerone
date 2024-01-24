import bellIcon from '../assets/Bellicon.svg';

function Notify({ notifyText }) {
  return (
    <figure className="instructionsFont mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-3xl border-2 border-lightYellow bg-lightPink px-5 py-2.5 text-base/none text-darkPink drop-shadow-lg">
      <img
        className="bell h-7 w-7"
        src={bellIcon}
        alt="bell-icon"
      />{' '}
      <figcaption className="text-center">{notifyText}</figcaption>
    </figure>
  );
}

export default Notify;
