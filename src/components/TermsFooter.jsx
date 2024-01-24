function TermsFooter({ handlePopup }) {
  return (
    <div className="fixed bottom-0 left-1/2 w-full -translate-x-1/2 bg-bgTexture px-5 py-4">
      <p className="headTitle mx-auto text-center text-sm/tight text-whitish">
        these are AI generated lyrics.{' '}
        <button
          type="button"
          onClick={() => handlePopup('activationPopup')}
          className="text-lightYellow"
        >
          Terms and Conditions Apply
        </button>
      </p>
    </div>
  );
}

export default TermsFooter;
