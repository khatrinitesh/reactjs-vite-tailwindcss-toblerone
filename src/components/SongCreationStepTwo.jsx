import Button from './Button';

const SongCreationStepTwo = ({
  songCreationData,
  handleSongCreationInputChange,
  handleStepTwoSubmit,
  handleBack,
}) => {
  const stepOneInputs = [
    {
      id: 1,
      name: 'whatMakesUnique',
      label: 'what makes them unique?',
      placeholder: 'Input answer within 50 characters',
      type: 'text',
    },
    {
      id: 2,
      name: 'favThing',
      label: "what's your favorite thing about them?",
      placeholder: 'Input answer within 50 characters',
      type: 'text',
    },
    {
      id: 3,
      name: 'loveReason',
      label: 'why do you love them?',
      placeholder: 'Input answer within 50 characters',
      type: 'text',
    },
  ];
  return (
    <form
      className="poppinsFont mx-auto mt-8 max-w-xl"
      onSubmit={handleStepTwoSubmit}
    >
      <div className="flex flex-col gap-4">
        {stepOneInputs.map((input) => (
          <div
            key={input.id}
            className="flex flex-col rounded-xl border-2 border-lightYellow bg-lightPink px-3 py-4"
          >
            <label
              htmlFor={input.name}
              className="instructionsFont -mt-2 mb-1.5 text-xs uppercase text-darkPink"
            >
              {input.label}
            </label>
            <input
              className="block w-full rounded-lg border-none shadow-inner placeholder:text-sm placeholder:text-lightGray"
              type={input.type}
              name={input.name}
              id={input.name}
              placeholder={input.placeholder}
              value={songCreationData[input.name]}
              onChange={handleSongCreationInputChange}
            />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-sm/tight font-medium  text-whitish md:text-base/tight">
        Answers must not use special characters
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 md:gap-4">
        <Button
          label="back"
          type="button"
          onClick={handleBack}
        />
        <Button
          label="next"
          type="submit"
        />
      </div>
    </form>
  );
};

export default SongCreationStepTwo;
