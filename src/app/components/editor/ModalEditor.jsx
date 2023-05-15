import ReactModal from 'react-modal';

const MyModal = ({ isOpen, onRequestClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className="mymodal"
      overlayClassName="mymodal-overlay"
    >
      <h1>CONTENT</h1>
    </ReactModal>
  );
};

export default MyModal;

