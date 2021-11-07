import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

function Numbers({ generation, population }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: 0, left: 0 }}>
      <button style={{ fontSize: "1.5rem" }} onClick={() => setIsOpen(!isOpen)}>
        🖥
      </button>
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsOpen(false)}
        style={{ content: { width: "max-content", height: "max-content" } }}
      >
        <label>Population: {population}</label>
        <label>generation: {generation}</label>
      </Modal>
    </div>
  );
}

export default Numbers;
