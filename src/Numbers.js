import { useState } from "react";
import Modal from "react-modal";
import { VictoryChart, VictoryLine } from "victory";
Modal.setAppElement("#root");

function Numbers({ generation, population, generationPopulation }) {
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
        <VictoryChart
          height={400}
          width={400}
          domainPadding={{ x: 50, y: [0, 20] }}
        >
          <VictoryLine
            data={generationPopulation}
            x="generation"
            y="population"
          />
        </VictoryChart>
      </Modal>
    </div>
  );
}

export default Numbers;
