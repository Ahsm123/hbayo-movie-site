const TrailerEmbed = ({ trailerKey }) => (
  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
    <iframe
      src={`https://www.youtube.com/embed/${trailerKey}`}
      title="Trailer"
      className="w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default TrailerEmbed;
