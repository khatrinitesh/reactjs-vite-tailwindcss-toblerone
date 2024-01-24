import Button from './Button';
import Heading from './Heading';
import LyricsText from './LyricsText';
import TermsFooter from './TermsFooter';

function LyricsScreen({ handleLyricsSubmit, lyrics, handlePopup }) {
  return (
    <section className="pb-12">
      <Heading title="Review your personalized thoughtful song!" />
      <form
        onSubmit={handleLyricsSubmit}
        className="mx-auto mt-6 flex max-w-xl flex-col items-center"
      >
        <div className="bg-chamois w-full border-2 border-dotted border-whitish p-6">
          <div className="customScrollbar max-h-64 overflow-y-scroll pr-4 text-center">
            {/* md:max-h-none md:overflow-y-auto */}
            {lyrics ? <LyricsText lyrics={lyrics} /> : 'Error Occurred'}
          </div>
        </div>
        <div className="mt-8">
          <Button
            type="submit"
            label="proceed"
          />
        </div>
        <TermsFooter handlePopup={handlePopup} />
      </form>
    </section>
  );
}

export default LyricsScreen;
