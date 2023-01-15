import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../services/API';

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (name === '') {
      return;
    }
    setLoading(true);
    fetchImages(name, page)
      .then(items => {
        if (items.hits.length === 0) {
          setShowButton(false);
          Notiflix.Notify.info('There are no images for your request');
        }
        setItems(prevItems => [...prevItems, ...items.hits]);
        setShowButton(page < Math.ceil(items.total / 12) ? true : false);
        setLoading(false);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [name, page]);

  const handleSubmit = name => {
    setName(name);
    setPage(1);
    setItems([]);
    setShowButton(false);
    setShowModal(false);
    setLargeImageURL('');
    setLoading(false);
  };

  const toggleModal = () => setShowModal(showModal => !showModal);

  const onButtonClick = () => setPage(prevPage => prevPage + 1);

  const getImageUrl = url => {
    console.log(url);
    setLargeImageURL(url);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        items={items}
        getImageUrl={getImageUrl}
        toggleModal={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
      )}
      {loading && <Loader />}
      {showButton && <Button onButtonClick={onButtonClick} />}
    </div>
  );
};