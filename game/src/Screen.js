import React, {useState} from 'react';
// import {useParams} from "react-router-dom";
import Modal from 'react-modal';
import Button from "react-bootstrap/Button";

Modal.setAppElement('#root');

function Screen({ imagePath }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const { imagePath } = useParams();

    return (
        <div>
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
                }
                }
            >
                <img height='540' width='580' src={`${getImgPath(imagePath)}`} alt=''/>
                <div>
                    <Button variant="success" onClick={() => setModalIsOpen(false)}>Zamknij</Button>
                </div>
            </Modal>
        </div>
    );
}

function getImgPath(imagePath) {
    return 'http://localhost:8000/uploads/' + imagePath;
}

export default Screen