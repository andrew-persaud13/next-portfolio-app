import moment from 'moment';

const Avatar = ({ imgSrc, createdAt, name }) => {
  return (
    <div className='media avatar-box mb-2'>
      <img className='mr-2' src={imgSrc} />
      <div className='media-body align-self-center'>
        <h5 className='mt-0 mb-0'>{name}</h5>
        <p className='mt-0 subtitle'>
          {moment(createdAt).format('YYYY MMM Do')}
        </p>
      </div>
    </div>
  );
};

export default Avatar;
