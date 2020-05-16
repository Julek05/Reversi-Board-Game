// import React, {useState} from 'react';
// import {useParams} from "react-router-dom";
// import Modal from 'react-modal';
//
// Modal.setAppElement('#root');
//
// function Screen() {
//     const { imagePath } = useParams();
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//
//     return (
//         <div>
//             <button onClick={() => setModalIsOpen(true)}>Pokaż zdjęcie</button>
//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={() => setModalIsOpen(false)}
//                 style={{
//                        overlay: {
//                          backgroundColor: 'lightgrey'
//                        },
//                         content : {
//                             top                   : '50%',
//                             left                  : '50%',
//                             right                 : 'auto',
//                             bottom                : 'auto',
//                             marginRight           : '-50%',
//                             transform             : 'translate(-50%, -50%)'
//                         }
//                     }
//                 }
//             >
//                 <img height='540' width='480' src={`${getImgPath(imagePath)}`} alt=''/>
//                 <div>
//                     <button onClick={() => setModalIsOpen(false)}>Zamknij</button>
//                 </div>
//             </Modal>
//         </div>
//     );
// }
//
// function getImgPath(imagePath) {
//     return 'http://localhost:8000/uploads/photos/' + imagePath;
// }
//
// export default Screen