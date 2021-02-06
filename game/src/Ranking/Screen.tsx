import React, {FunctionComponent, useState} from 'react';
import Modal from 'react-modal';
import Button from "react-bootstrap/Button";
import {API_URLS} from "../Common/constants";

Modal.setAppElement('#root');

interface ScreenProps {
    imagePath: string
}

export const Screen: FunctionComponent<ScreenProps> =  ({ imagePath }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <Button variant="success" onClick={() => setModalIsOpen(true)}>Pokaż zdjęcie</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content : {
                        top                   : '50%',
                        left                  : '50%',
                        right                 : 'auto',
                        bottom                : 'auto',
                        marginRight           : '-50%',
                        transform             : 'translate(-50%, -50%)'
                    }
                }}
            >
                <img height='540' width='580' src={`${API_URLS.UPLOADS}/${imagePath}`} alt=''/>
                <div>
                    <Button variant="success" onClick={() => setModalIsOpen(false)}>Zamknij</Button>
                </div>
            </Modal>
        </>
    );
}
