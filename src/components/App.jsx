import { useState, useEffect } from 'react';
import { GlobalStyle } from "../GlobalStyle";
import { getPhotos } from '../services';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';

export default function App() {

  //  === ХУКи состояния
  const [images, setImages] = useState([]); // Начальный массив изображений
  const [inputSearch, setInputSearch] = useState(''); // Поисковый запрос
  const [page, setPage] = useState(1); // Начальная страница отображения запроса
  const [status, setStatus] = useState('idle'); // Статус ожидания
  const [totalImages, setTotalImages] = useState(0); // Начальное количество найденных изображений

  // === ХУК API-запроса
  useEffect(() => {
    // Блокировка запроса при первом рендере
    if (!inputSearch) {
      return;
    };

    setStatus('pending');
    
    // Запрос на сервер
    getPhotos(inputSearch, page)
      .then(response => {
        setImages([...images, ...response.data.hits]) // Добавление изображений в массив
        setTotalImages(response.data.total) // Установка количества найденных изображений
        setStatus('idle') // Выключение статуса ожидания ответа сервера (выкл спиннер)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputSearch, page]);

  // === Функция получения нового запроса
  const handleSubmit = (event) => {
    event.preventDefault();
    // Получение запроса из поля input
    setInputSearch(`${Date.now()}/${event.target[1].value.toLowerCase()}`);
    setPage(1);
    setImages([]);
  };

  // === Функция добавлений новых фото по кнопке Load more
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1)
  };

    return (
      <div>

        <GlobalStyle /> 

        <Searchbar
          onSubmitForm={handleSubmit}
        />
        {/* Рендер списка, если массив изображений не пустой */}
        {images.length !== 0 && <ImageGallery arrImages={images} />}
        
        {/* Рендер кнопки "Load more", если: 1) массив изображений больше 0 И 2) всего изображений больше 12 И */}
        {/* 3) длинна массива меньше общего кол-ва изображений И 4) status === 'idle' */}
        {((images.length !== 0) && (totalImages > 12) && (images.length < totalImages) && (status === 'idle'))
          && <Button onClickLoadMore={handleLoadMore} />} 

        {/* Рендер спиннера во время ожидания ответа сервера */}
        {status === 'pending' && <Loader />}

      </div>
    )
};