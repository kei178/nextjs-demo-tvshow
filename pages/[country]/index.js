// import { useEffect } from 'react';
import axios from 'axios';
import Thumbnail from '../../components/Thumbnail';
// import ThumbnailWithSass from '../../components/ThumbnailWithSass';
import Error from 'next/error';
import cookies from 'nookies';

const Home = ({ shows, country, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  // For CSR
  // useEffect(() => {
  //   axios
  //     .get('http://api.tvmaze.com/schedule?country=US&date=2014-12-01')
  //     .then((response) => console.log(response.data));
  // }, []);

  const renderShows = () => {
    return shows.map((showItem, index) => {
      const { show } = showItem;
      return (
        <li key={index}>
          <Thumbnail
            imageUrl={show.image ? show.image.medium : undefined}
            caption={show.name}
            href="/[country]/[showId]"
            as={`/${country}/${show.id}`}
          />
        </li>
      );
    });
  };

  return (
    <div>
      <ul className="tvshows-grid">{renderShows()}</ul>
      <style jsx>{`
        .tvshows-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
      `}</style>
    </div>
  );
};

// For SSR
// XXX It will be executed before the React component is rendered
// `context` includes request info
Home.getInitialProps = async (context) => {
  try {
    const { defaultCountry } = cookies.get(context);
    const country = context.query.country || defaultCountry || 'us';

    const response = await axios.get(
      `https://api.tvmaze.com/schedule?country=${country}&date=2014-12-01`
    );

    return {
      shows: response.data,
      country: country,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

export default Home;
