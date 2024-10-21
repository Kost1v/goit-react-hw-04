const ImageCard = ({ image, description, onClick }) => {
  return (
    <div>
      <img src={image} alt={description} onClick={onClick} />
    </div>
  );
};

export default ImageCard;
