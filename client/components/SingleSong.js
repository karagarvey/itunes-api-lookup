import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default function SingleSong(props) {
  const { artworkUrl100, trackName, releaseDate, previewUrl } = props.result;
  const releaseMonth = releaseDate.substring(5, 7);
  const releaseDay = releaseDate.substring(8, 10);
  const releaseYear = releaseDate.substring(0, 4);
  return (
    <Card className="flex-item card">
      <CardImg src={artworkUrl100} />
      <CardTitle className="card-text">{trackName}</CardTitle>
      <CardSubtitle>{`${releaseMonth}-${releaseDay}-${releaseYear}`}</CardSubtitle>
      <div>
        <Button target="blank" href={previewUrl}>
          Listen now!
        </Button>
      </div>
    </Card>
  );
}
