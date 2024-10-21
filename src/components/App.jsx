import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";

import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import ImageModal from "./ImageModal/ImageModal";

const App = () => {
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      right: "auto",
      bottom: "auto",
      border: "none",
      borderRadius: "8px",
      padding: "0"
    },
  };

  const onSubmit = (searchTerm) => {
    setSearchValue(searchTerm);
    setCurrentPage(1);
    setPhotos([]);
  };

  const modalOpen = (photo) => {
    setSelectedPhoto(photo);
    setmodalIsOpen(true);
  };
  const modalClose = () => {
    setmodalIsOpen(false);
    setSelectedPhoto(null);
  };

  const notify = () =>
    toast("Good Job!", {
      icon: "👏",
    });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchValue === "") return;
        setIsLoading(true);

        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos/?page=${currentPage}&query=${searchValue}&client_id=fpSjF5C1C_6DY-z_mUhmp2TbTEtQjTmZ8IDLv9cUjyY`
        );
        setTotalPage(data.total_pages);

        if (data.total_pages > 0) {
          notify();
        }

        setPhotos((prevPhotos) => {
          if (currentPage === 1) setPhotos(data.results);

          return [...prevPhotos, ...data.results];
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        setError(false);
      }
    };

    fetchProducts();
  }, [searchValue, currentPage]);

  const loadMoreImage = () => {
    setCurrentPage(currentPage + 1);
  };
  
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {photos !== null && (
        <ImageGallery photos={photos} modalOpen={modalOpen} />
      )}
      {photos !== null && currentPage < totalPage && (
        <LoadMoreBtn loadMoreImage={loadMoreImage} />
      )}
      {selectedPhoto && (
        <ImageModal
          isOpen={modalIsOpen}
          photo={selectedPhoto}
          modalClose={modalClose}
          customStyles={customStyles}
        />
      )}
    </>
  );
};

export default App;
