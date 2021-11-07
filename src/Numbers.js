import { useState } from "react";
import Modal from "react-modal";
import { VictoryChart, VictoryLine } from "victory";
Modal.setAppElement("#root");

function Numbers({
  generation,
  population,
  generationPopulation,
  populationChangePercent,
}) {
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
        style={{
          content: { width: "max-content", height: "max-content" },
          overlay: { backgroundColor: "transparent" },
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Generation</th>
              <th>Population</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{generation}</th>
              <th>{population}</th>
              <th
                style={{ color: populationChangePercent > 0 ? "green" : "red" }}
              >
                {populationChangePercent}
              </th>
            </tr>
          </tbody>
        </table>

        <VictoryChart height={400} width={400}>
          <VictoryLine
            data={generationPopulation}
            x="generation"
            y="population"
          />
        </VictoryChart>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default Numbers;
