import { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

function Setting({ time, cellWidth, initialLivePercent, handleSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", top: 0, left: 0 }}>
      <button style={{ fontSize: "1.5rem" }} onClick={() => setIsOpen(!isOpen)}>
        ⚙️
      </button>
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setIsOpen(false)}
        style={{ content: { width: "max-content", height: "max-content" } }}
      >
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="time">Interval ms</label>
            <input
              id="time"
              defaultValue={time}
              placeholder="Interval in ms"
              name="time"
            />
          </div>
          <div className="input">
            <label htmlFor="cellWidth">Cell Width in pixel</label>
            <input
              id="cellWidth"
              defaultValue={cellWidth}
              placeholder="Cell Width px"
              name="cellWidth"
            />
          </div>
          <div className="input">
            <label htmlFor="initialLivePercent">Initial Live Percentage</label>
            <input
              id="initialLivePercent"
              defaultValue={initialLivePercent}
              placeholder="Initial Live Percent"
              name="initialLivePercent"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit">Submit and start over</button>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Setting;
