import tobleronePack from '../assets/tob-pack.png';
import Button from './Button';
import Heading from './Heading';

function WelcomeBackScreen({
  userName,
  handleSignIn,
  handleSignUp,
  isButtonLoading,
}) {
  return (
    <section className="flex flex-col items-center justify-center self-center">
      <Heading title="a personalized song inspired by your one-of-a-kind love" />
      <img
        className="mb-4 mt-6 w-full max-w-xl"
        src={tobleronePack}
        alt="toblerone-pack"
      />
      <h2 className="headTitle mb-6 text-center text-3xl text-lightYellow">
        Welcome Back{' '}
        <span className="capitalize text-darkPink">{userName}</span>
      </h2>
      <div className="flex flex-row items-center justify-center gap-3 md:gap-4">
        <Button
          onClick={handleSignIn}
          isButtonLoading={isButtonLoading}
          type="button"
          label="Sign In"
        />
        <button
          className="headTitle w-36 rounded-xl border-2 border-lightYellow py-2 text-sm text-lightYellow md:w-48 md:py-2.5 md:text-base"
          type="button"
          onClick={handleSignUp}
        >
          New Sign Up
        </button>
      </div>
    </section>
  );
}

export default WelcomeBackScreen;
