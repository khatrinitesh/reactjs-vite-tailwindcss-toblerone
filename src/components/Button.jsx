function Button({ label, type, onClick, icon, isButtonLoading }) {
  return (
    <button
      className={`headTitle flex w-36 items-center justify-center gap-2 rounded-2xl border-2 border-lightYellow bg-lightPink py-2 text-sm text-darkPink duration-200 md:w-48 md:py-2.5 md:text-base ${
        isButtonLoading ? `opacity-90` : null
      }`}
      type={type}
      onClick={onClick}
      disabled={isButtonLoading}
    >
      {isButtonLoading ? 'Loading...' : `${label}`}{' '}
      {!isButtonLoading && icon && (
        <img
          className="w-3"
          src={icon}
          alt="icon"
        />
      )}
    </button>
  );
}

export default Button;
