import React from 'react';

export default function SingleSong(props) {
  const { artworkUrl100, trackName, releaseDate } = props.result;
  const releaseMonth = releaseDate.substring(5, 7);
  const releaseDay = releaseDate.substring(8, 10);
  const releaseYear = releaseDate.substring(0, 4);
  return (
    <div>
      {/* {console.log('aa', props.match.params)} */}
      <img src={artworkUrl100} />
      <p>{trackName}</p>
      <p>{`${releaseMonth}-${releaseDay}-${releaseYear}`}</p>
    </div>
  );
}
