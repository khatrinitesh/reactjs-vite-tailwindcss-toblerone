import tobleronePack from '../assets/tob-pack.png';

function LandscapeScreen() {
  return (
    <section className="landscape-screen fixed inset-0 z-[999] hidden h-full w-full bg-bgTexture p-5">
      <figure className=" flex h-full w-full flex-col items-center justify-center">
        <img
          className="w-full max-w-xs"
          src={tobleronePack}
          alt="toblerone-pack"
        />
        <figcaption className="headTitle text-3xl text-lightYellow">
          Best view in Portrait Mode
        </figcaption>
      </figure>
    </section>
  );
}

export default LandscapeScreen;
