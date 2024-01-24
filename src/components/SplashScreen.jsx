import tobleronePack from '../assets/tob-pack.png';
import Heading from './Heading';

function SplashScreen() {
  return (
    <section className="flex flex-col items-center justify-center self-center">
      <Heading title="a personalized song inspired by your one-of-a-kind love" />
      <img
        className="mt-6 w-full max-w-xl"
        src={tobleronePack}
        alt="toblerone-pack"
      />
    </section>
  );
}

export default SplashScreen;
