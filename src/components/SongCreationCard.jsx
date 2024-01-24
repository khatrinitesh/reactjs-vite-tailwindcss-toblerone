import Heading from './Heading';
import ProgressBar from './StepProgress';
import SongCreationStepOne from './SongCreationStepOne';
import SongCreationStepTwo from './SongCreationStepTwo';

function SongCreationCard({
  songCreationStep,
  setSongCreationStep,
  songCreationData,
  handleSongCreationInputChange,
  handleStepOneSubmit,
  handleStepTwoSubmit,
  handleBack,
}) {
  return (
    <section>
      <Heading title="tell us what makes your loved one one-of-a-kind!" />
      <ProgressBar
        songCreationStep={songCreationStep}
        setSongCreationStep={setSongCreationStep}
      />
      {songCreationStep === 1 ? (
        <SongCreationStepOne
          songCreationData={songCreationData}
          handleSongCreationInputChange={handleSongCreationInputChange}
          handleStepOneSubmit={handleStepOneSubmit}
        />
      ) : (
        <SongCreationStepTwo
          songCreationData={songCreationData}
          handleSongCreationInputChange={handleSongCreationInputChange}
          handleStepTwoSubmit={handleStepTwoSubmit}
          handleBack={handleBack}
        />
      )}
    </section>
  );
}

export default SongCreationCard;
