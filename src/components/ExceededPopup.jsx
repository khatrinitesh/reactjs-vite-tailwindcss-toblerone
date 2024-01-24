import heartNote1 from '../assets/heart-note1.png';
import heartNote2 from '../assets/heart-note2.png';
import x from '../assets/x.png';

function ExceededPopup({ setShowExceededPopup }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-sm backdrop-brightness-50">
      <div className="headTitle background-texture relative flex min-h-56 w-full max-w-md flex-col items-center justify-center rounded-2xl border-2 border-lightYellow bg-bgTexture p-4 text-center text-2xl/tight">
        <img
          role="button"
          onClick={() => setShowExceededPopup(false)}
          className="absolute right-4 top-4 h-4 w-4 text-whitish duration-200 hover:scale-110"
          src={x}
          alt="x"
        />
        <figure className="mb-4 flex">
          <img
            className="h-14"
            src={heartNote1}
            alt="Heart Note 1"
          />
          <img
            className="-ml-2 mt-6 h-6"
            src={heartNote2}
            alt="Heart Note 1"
          />
        </figure>
        <p className="max-w-md text-lightYellow">
          uh oh! <br /> The cupids see you've already reached the 3-song limit!
        </p>
      </div>
    </div>
  );
}

export default ExceededPopup;
