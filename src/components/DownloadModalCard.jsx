import tobleronePack from '../assets/tob-pack.png';
import shopeeBtn from '../assets/shopee.png';
import lazadaBtn from '../assets/lazada.png';
import heartNote1 from '../assets/heart-note1.png';
import heartNote2 from '../assets/heart-note2.png';
import x from '../assets/x.png';

function DownloadModalCard({
  handleShopee,
  handleLazada,
  setIsDownloadModalOpen,
}) {
  return (
    <section className="fixed inset-0 z-50 flex h-full w-full items-center justify-center p-4 backdrop-blur-sm backdrop-brightness-50">
      <div className="background-texture relative z-50 flex w-full max-w-xs flex-col items-center justify-center rounded-2xl border-2 border-whitish px-4 py-8 shadow-lg md:max-w-xl">
        <img
          role="button"
          onClick={() => setIsDownloadModalOpen(false)}
          className="absolute right-3 top-3 h-4 w-4 text-whitish duration-200 hover:scale-110"
          src={x}
          alt="x"
        />
        <img
          className="absolute left-6 top-8 w-full max-w-[2rem] md:left-20 md:top-[30%] md:max-w-[2.5rem]"
          src={heartNote2}
          alt="Heart Note 1"
        />
        <img
          className="absolute right-4 top-14 hidden w-full max-w-[3rem] md:right-16 md:block md:max-w-[3.5rem]"
          src={heartNote1}
          alt="Heart Note 1"
        />
        <h3 className="instructionsFont mb-3 max-w-[16rem] text-center text-xl/none uppercase text-whitish md:max-w-xs">
          Thank You for downloading a thoughtful
        </h3>
        <img
          className="w-full max-w-[18rem]"
          src={tobleronePack}
          alt="toblerone-pack"
        />
        <h3 className="instructionsFont text-center text-xl/none uppercase text-whitish">
          Love Song
        </h3>
        <div className="my-4 w-full border-b-2" />
        <p className="instructionsFont mb-5 max-w-[26rem] px-4 text-center text-sm/tight uppercase text-whitish">
          Complete your thoughtful gift! Buy a toblerone along with your
          thoughtful song!
        </p>
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-5">
          <img
            className="w-36"
            role="button"
            src={shopeeBtn}
            alt="shopee button"
            onClick={handleShopee}
          />
          <img
            className="w-36"
            role="button"
            src={lazadaBtn}
            alt="lazada button"
            onClick={handleLazada}
          />
        </div>
      </div>
    </section>
  );
}

export default DownloadModalCard;
