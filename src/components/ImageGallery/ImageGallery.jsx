import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ photos, modalOpen }) => {
  return (
    <ul className={css.gallery}>
      {photos !== null &&
        photos.map((photo) => {
          return (
            <li key={photo.id} className={css.listItem}>
              <ImageCard
                image={photo.urls.small}
                description={photo.alt_description}
                onClick={() => modalOpen(photo)}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
