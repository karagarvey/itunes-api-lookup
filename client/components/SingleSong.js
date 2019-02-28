import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, Button } from 'reactstrap';

export default function SingleSong(props) {
  const {
    artworkUrl100,
    trackName,
    releaseDate,
    previewUrl,
    artistName
  } = props.result;
  const releaseMonth = releaseDate.substring(5, 7);
  const releaseDay = releaseDate.substring(8, 10);
  const releaseYear = releaseDate.substring(0, 4);
  return (
    <Card className="flex-item card center">
      <CardImg src={artworkUrl100} />
      <CardTitle className="card-text center">{trackName}</CardTitle>
      <CardSubtitle className="center">{artistName}</CardSubtitle>
      <br />
      <CardSubtitle className="center">
        Released <div> {`${releaseMonth}-${releaseDay}-${releaseYear}`} </div>
      </CardSubtitle>

      <div>
        <Button target="blank" href={previewUrl}>
          Listen now!
        </Button>
      </div>
    </Card>
  );
}
