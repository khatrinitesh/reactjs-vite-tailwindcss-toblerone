import heartNote1 from '../assets/heart-note1.png';
import heartNote2 from '../assets/heart-note2.png';

function Heading({ title }) {
  return (
    <figure className="relative mx-auto max-w-72 md:max-w-xl">
      <img
        className="absolute -left-1 top-[45%] w-full max-w-[2.25rem] md:left-0 md:top-[25%] md:max-w-[2.5rem]"
        src={heartNote2}
        alt="Heart Note 1"
      />
      <img
        className="absolute -right-2 top-0 w-full max-w-[3.25rem] md:top-2 md:max-w-[3.5rem]"
        src={heartNote1}
        alt="Heart Note 1"
      />

      <figcaption>
        <h1 className="headTitle mx-auto mb-4 text-center text-[2.25rem]/none text-lightYellow md:text-[2.75rem]/none">
          gift a thoughtful{' '}
          <span className="header--pushDown block tracking-wider text-darkPink md:inline">
            toblerone
          </span>{' '}
          love song
        </h1>
        {title && (
          <p className="headTitle text-center text-lg leading-none text-whitish">
            {title}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

export default Heading;
