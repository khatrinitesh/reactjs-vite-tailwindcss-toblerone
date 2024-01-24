import Button from './Button';
import downloadIcon from '../assets/download.svg';
import shareIcon from '../assets/share.svg';
import { useRef, useState } from 'react';
import DownloadModalCard from './DownloadModalCard';
import Backdrop from './Backdrop';
import videoPoster from '../assets/video-poster.png';

function VideoScreen({
  isDownloadModalOpen,
  setIsDownloadModalOpen,
  videoURL,
  handleDownload,
  handleShare,
  handleShopee,
  handleLazada,
  isButtonLoading,
  handlePopup,
}) {
  const videoRef = useRef();
  const [showBackdrop, setShowBackdrop] = useState(true);

  const handleVideoControls = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setShowBackdrop(false);
    } else {
      video.pause();
      setShowBackdrop(true);
    }
  };

  return (
    <section>
      {isDownloadModalOpen && (
        <DownloadModalCard
          setIsDownloadModalOpen={setIsDownloadModalOpen}
          handleShopee={handleShopee}
          handleLazada={handleLazada}
        />
      )}
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-x-14 gap-y-5 md:flex-row">
        <div
          onClick={handleVideoControls}
          className="relative flex h-full w-full max-w-xs items-center justify-center rounded border-4 border-whitish"
        >
          {showBackdrop && <Backdrop icon={true} />}
          <video
            webkit-playsinline="true"
            playsInline
            poster={videoPoster}
            className="h-full w-full object-cover [aspect-ratio:9/16]"
            ref={videoRef}
            src={videoURL}
            onEnded={() => setShowBackdrop(true)}
          ></video>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 md:flex-col">
            <Button
              type="button"
              onClick={handleDownload}
              label="download"
              icon={downloadIcon}
            />
            <Button
              label="share"
              type="button"
              isButtonLoading={isButtonLoading}
              onClick={handleShare}
              icon={shareIcon}
            />
          </div>
          <p className="headTitle mt-4 text-center text-xs/tight text-whitish">
            these are AI generated lyrics. &nbsp;
            <button
              type="button"
              onClick={() => handlePopup('activationPopup')}
              className="text-lightYellow"
            >
              Terms and Conditions Apply
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default VideoScreen;
