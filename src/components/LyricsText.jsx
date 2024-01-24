import React from 'react';

function LyricsText({ lyrics }) {
  const lyricsParas = lyrics.split('\n');
  return (
    <div className="instructionsFont mx-auto max-w-xs">
      {lyricsParas.map((para, index) => (
        <React.Fragment key={index}>
          <p className="mb-5 text-base/tight">{para.trim()}</p>
        </React.Fragment>
      ))}
    </div>
  );
}

export default LyricsText;
