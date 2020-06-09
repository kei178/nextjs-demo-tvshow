// import ThumbnailStyles from './styles';
import Link from 'next/link';

const Thumbnail = ({
  imageUrl = 'https://via.placeholder.com/210x295?text=No%20Image',
  caption,
  href = '',
  as = '',
  small = false,
}) => {
  return (
    <div className="thumbnail">
      <Link href={href} as={as}>
        <a>
          <img src={imageUrl} className="thumbnail__image" />
          <div className="thumbnail__caption">{caption}</div>
        </a>
      </Link>
      <style jsx>{`
        .thumbnail__image {
          width: ${small ? '100px' : '100%'};
        }

        .thumbnail__caption {
          text-align: center;
          padding: ${small ? '5px 0px' : '5px'};
          width: ${small ? '100px' : '100%'};
        }
      `}</style>
    </div>
  );
};

export default Thumbnail;
