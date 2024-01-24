const ProgressBar = ({ songCreationStep }) => {
  const songCreationProgressBar = (songCreationStep / 3) * 100;
  return (
    <section className="mx-auto mt-6 max-w-xl">
      <div className="instructionsFont mb-2 flex w-full items-center justify-between text-xs uppercase text-whitish">
        <p>song creation</p>
        <p>{`${songCreationStep}/3`}</p>
      </div>
      <div className="overflow-hidden rounded-md border-2 border-lightYellow bg-whitish">
        <div
          className=" rounded bg-lightPink [transition-duration:2000ms]"
          style={{
            width: `${songCreationProgressBar}%`,
            height: '10px',
          }}
        />
      </div>
    </section>
  );
};

export default ProgressBar;
