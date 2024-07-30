import PropTypes from 'prop-types';

const Card = ({ item }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

  return (
    <div className="relative max-w-xs overflow-hidden rounded-2xl shadow-lg group">
      <img
        src={imageUrl}
        alt={item.title || item.name}
        className="transition-transform group-hover:scale-110 duration-200 w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h1 className="text-2xl font-bold text-white mb-2">
          {item.title || item.name}
        </h1>
        <p className="text-sm text-white">
          {item.overview}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400 text-xl">★</span>
          <span className="text-white font-bold text-lg ml-1">
            {Math.floor(item.vote_average)}
          </span>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    name: PropTypes.string,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default Card;
