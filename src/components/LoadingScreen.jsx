import heartIcon from '../assets/loading-heart.png';
import Button from './Button';

function LoadingScreen({
  loadingProgress,
  title,
  showVocalAgainBtn,
  handleReVocalize,
}) {
  return (
    <section className="mx-auto max-w-xl">
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="headTitle text-center text-4xl text-whitish">{title}</h2>
        <div className="relative flex h-20 w-full items-center justify-center rounded-xl border-4 border-dotted border-whitish bg-lightPink px-6">
          <p className="absolute -top-7 right-0 font-bold text-lightYellow">
            {loadingProgress}%
          </p>
          <div className="h-2.5 w-full bg-whitish">
            <div
              style={{ width: `${loadingProgress}%` }}
              className="relative h-full bg-darkPink [transition-duration:500ms]"
            >
              <img
                className="absolute -right-7 top-1/2 min-w-[3rem] max-w-[3rem] -translate-y-1/2"
                src={heartIcon}
                alt="heart-icon"
              />
            </div>
          </div>
        </div>
        <h2 className="headTitle text-3xl tracking-wider text-whitish">
          Please Wait
          <span className="animate-ping">.</span>
          <span className="animate-ping [animation-delay:150ms]">.</span>
          <span className="animate-ping [animation-delay:300ms]">.</span>
        </h2>
        {showVocalAgainBtn && (
          <div>
            <p className="poppinsFont mb-2 text-center text-sm font-medium text-whitish md:text-base">
              Taking too long?
            </p>
            <Button
              type="button"
              label="vocalize again"
              onClick={handleReVocalize}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default LoadingScreen;
