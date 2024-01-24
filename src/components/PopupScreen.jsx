import ActivationPopup from './ActivationPopup';
import TermsPopUp from './TermsPopUp';
import PrivacyPopup from './PrivacyPopup';

function PopupScreen({ popupPage, handlePopup }) {
  return (
    <section className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center p-5 backdrop-brightness-50">
      <div className="relative h-full w-full max-w-5xl rounded-2xl bg-white px-3 py-6 md:px-5 md:py-10">
        <button
          type="button"
          onClick={handlePopup}
          className="instructionsFont absolute right-2 top-2 h-6 w-6 rounded-full bg-darkPink uppercase leading-none text-white duration-200 hover:scale-110"
        >
          x
        </button>
        {popupPage === 'activationPopup' && <ActivationPopup />}
        {popupPage === 'termsPopup' && <TermsPopUp />}
        {popupPage === 'privacyPopup' && <PrivacyPopup />}
      </div>
    </section>
  );
}

export default PopupScreen;
