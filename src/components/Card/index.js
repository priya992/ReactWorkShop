import React, {useState} from 'react';

const Card = (props) => {
  const [image, setImage] = useState(`media/${props.value.['poster-image']}`)
  const onError = () => {
    setImage(`media/placeholder_for_missing_posters.png`)
  }

  return (
    <>
      <img
        src={image}
        alt="test"
        className="image-style"
        onError={onError}
      />
      <div className="card-text">{props.value.name}</div>
    </>
  )
}

export default Card;
