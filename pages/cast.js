import axios from 'axios';
import Thumbnail from '../components/Thumbnail';
import Error from 'next/error';
import { withAuthorization } from '../utils/withAuthorization';

const CastMemberDetails = ({ data = {}, statusCode }) => {
  if (statusCode) {
    return <Error statusCode={statusCode} />;
  }

  const { name, image, birthday, country } = data;
  const imageUrl = image ? image.medium : undefined;

  return (
    <div className="cast-detail">
      <Thumbnail imageUrl={imageUrl} caption={name}></Thumbnail>
      <ul>
        <li>Country: {country ? country.name : 'Unknown'}</li>
        <li>Birth Day: {birthday || 'Unknown'}</li>
      </ul>
      <style jsx>{`
        .cast-detail {
          display: flex;
          max-width: 400px;
          margin: 0 auto;
          flex-direction: column;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

CastMemberDetails.getInitialProps = async ({ query }) => {
  try {
    const { personId } = query;

    const response = await axios.get(
      `https://api.tvmaze.com/people/${personId}`
    );

    return {
      data: response.data,
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
    };
  }
};

export default withAuthorization(CastMemberDetails);
