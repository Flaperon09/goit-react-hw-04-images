import { useState, useEffect } from 'react';
import { GalleryItem, GalleryPhoto } from "./ImageGalleryItem.styled";
import Modal from '../Modal';

export default function ImageGalleryItem({id, webformatURL, largeImageURL}) {
    
    // === ХУК состояния
    const [showModal, setShowModal] = useState(false); // Состояние модального окна (закрыто)
    const [idImageForModal, setIdImageForModal] = useState(0); // id фото, по которому кликнули

    // === Плавная прокрутка загружаемых изображений
    useEffect(() => {
        window.scrollBy({ top: 850, behavior: "smooth", });
    }, []);

    // === Изменение состояния модального окна (открыто/закрыто)
    const toggleModal = (id) => {
        setShowModal(!showModal);
        setIdImageForModal(id);
    };

    return (
        <GalleryItem key={id}>
            <GalleryPhoto
                src={webformatURL}
                alt=""
                onClick={() => toggleModal(id)}
            />

            {/* Открытие модального окна по условиям */}
            {showModal && idImageForModal === id &&
                <Modal
                    largeImage={largeImageURL}
                    onClose={toggleModal}
                />
            }
        </GalleryItem>
    )
};