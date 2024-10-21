import Modal from "react-modal";

const ImageModal = ({ isOpen, photo, customStyles, modalClose }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={modalClose}
        contentLabel="Image Modal"
        style={customStyles}
      >
        {/* {console.log(photo)} */}
        
        <img src={photo.urls.regular} alt={photo.alt_description} />
      </Modal>
    </div>
  );
};

export default ImageModal;
