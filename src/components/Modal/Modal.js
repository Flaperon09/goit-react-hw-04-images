import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackground, ModalImage, Image } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, largeImage}) {

    // === ХУК подключения и удаления слушателя событий
    useEffect(() => {
        // const handleKeyDown = e => console.log();
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // === Функция закрытия модального окна по Esc
    const handleKeyDown = event => {
        if (event.code === 'Escape') {
            onClose();
        };
    };

    // === Функция закрытия модального окна по клику в бекдроп
    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        };
    };

    return createPortal(
        <ModalBackground onClick={handleBackdropClick}>
            <ModalImage>
                <Image src={largeImage} alt="" />
            </ModalImage>
        </ModalBackground>,
        modalRoot,
    );
};