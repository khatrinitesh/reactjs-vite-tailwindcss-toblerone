import hamburgerMenu from '../assets/hamburger-menu.svg';
import heartNote1 from '../assets/heart-note1.png';
import heartNote2 from '../assets/heart-note2.png';
import { externalLinks } from '../constants/externalLinks';

function NavBar({ isNavOpen, setIsNavOpen, handlePopup }) {
  return (
    <nav className="mb-6 flex justify-end">
      <div className="relative">
        <img
          role="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          className={`h-8 w-8 self-end duration-200 hover:scale-110`}
          src={hamburgerMenu}
          alt="heart note"
        />
        <div
          className={`absolute right-0 top-0 z-40 w-64 rounded-md border-4 border-lightYellow bg-lightPink p-4 duration-200 md:w-72 ${
            !isNavOpen && 'hidden'
          }`}
        >
          <div className="flex w-full items-start justify-between">
            <figure className="mb-6 flex">
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

            <img
              role="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
              className={`h-8 w-8 duration-200 hover:scale-110`}
              src={hamburgerMenu}
              alt="heart note"
            />
          </div>

          <ul className="instructionsFont">
            <button
              type="button"
              onClick={() => handlePopup('termsPopup')}
              className="mb-3 block w-full cursor-pointer rounded-lg border-2 border-transparent bg-navPink p-2.5 text-center text-sm text-darkPink underline underline-offset-2 duration-200 hover:border-lightYellow"
            >
              <li>Terms and Conditions</li>
            </button>
            <button
              type="button"
              onClick={() => handlePopup('privacyPopup')}
              className="mb-3 block w-full cursor-pointer rounded-lg border-2 border-transparent bg-navPink p-2.5 text-center text-sm text-darkPink underline underline-offset-2 duration-200 hover:border-lightYellow"
              href={externalLinks.privacyPolicy}
              target="_blank"
            >
              <li>Privacy Policy</li>
            </button>
            <button
              type="button"
              onClick={() => handlePopup('activationPopup')}
              className="mb-3 block w-full cursor-pointer rounded-lg border-2 border-transparent bg-navPink p-2.5 text-center text-sm text-darkPink underline underline-offset-2 duration-200 hover:border-lightYellow"
            >
              <li>Activation Mechanics</li>
            </button>
            <a
              className="mb-6 block cursor-pointer rounded-lg border-2 border-transparent bg-navPink p-2.5 text-center text-sm text-darkPink underline underline-offset-2 duration-200 hover:border-lightYellow"
              href={externalLinks.contactUs}
              target="_blank"
            >
              <li>Contact Us</li>
            </a>
          </ul>

          <button
            className="headTitle mx-auto block w-36 rounded-full bg-lightYellow p-2 text-sm text-darkPink duration-200 hover:brightness-110"
            type="button"
            onClick={() => setIsNavOpen(false)}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
