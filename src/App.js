import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";

const CELL_WIDTH = 30;
const RNADOM_SEED = 10000000000;
const INTERVAL = 1000;

function App() {
  const [numberOfRows, setNumberOfRows] = useState(0);
  const [numberOfColumns, setNumberOfColumns] = useState(0);
  const [cells, setCells] = useState([]);
  const interval = useRef();

  useEffect(() => {
    const rows = Math.round(window.innerHeight / CELL_WIDTH);
    const columns = Math.round(window.innerWidth / CELL_WIDTH);
    setNumberOfRows(rows);
    setNumberOfColumns(columns);
  }, []);

  useEffect(() => {
    const _cells = new Array(numberOfRows);

    for (let i = 0; i < numberOfRows; i++) {
      _cells[i] = new Array(numberOfColumns).fill(0, 0);
      for (let j = 0; j < numberOfColumns; j++) {
        _cells[i][j] = Math.random() * RNADOM_SEED > RNADOM_SEED / 10 ? 1 : 0;
      }
    }

    setCells(_cells);
  }, [numberOfRows, numberOfColumns]);

  const nextGeneration = useCallback(() => {
    function getNorth(rowIndex, columnIndex) {
      if (rowIndex - 1 > 0) {
        return cells[rowIndex - 1][columnIndex];
      }
      return undefined;
    }
    function getSouth(rowIndex, columnIndex) {
      if (rowIndex + 1 < numberOfRows) {
        return cells[rowIndex + 1][columnIndex];
      }
      return undefined;
    }
    function getEast(rowIndex, columnIndex) {
      if (columnIndex + 1 < numberOfColumns) {
        return cells[rowIndex][columnIndex + 1];
      }
      return undefined;
    }
    function getWest(rowIndex, columnIndex) {
      if (columnIndex - 1 > 0) {
        return cells[rowIndex][columnIndex - 1];
      }
      return undefined;
    }
    function getNorthEast(rowIndex, columnIndex) {
      if (columnIndex + 1 < numberOfColumns && rowIndex - 1 > 0) {
        return cells[rowIndex - 1][columnIndex + 1];
      }
      return undefined;
    }
    function getNorthWest(rowIndex, columnIndex) {
      if (columnIndex - 1 > 0 && rowIndex - 1 > 0) {
        return cells[rowIndex - 1][columnIndex - 1];
      }
      return undefined;
    }
    function getSouthEast(rowIndex, columnIndex) {
      if (columnIndex + 1 < numberOfColumns && rowIndex + 1 < numberOfRows) {
        return cells[rowIndex + 1][columnIndex + 1];
      }
      return undefined;
    }
    function getSouthWest(rowIndex, columnIndex) {
      if (columnIndex - 1 > 0 && rowIndex + 1 < numberOfRows) {
        return cells[rowIndex + 1][columnIndex - 1];
      }
      return undefined;
    }
    function getNeighbours(rowIndex, columnIndex) {
      const north = getNorth(rowIndex, columnIndex);
      const south = getSouth(rowIndex, columnIndex);
      const east = getEast(rowIndex, columnIndex);
      const west = getWest(rowIndex, columnIndex);
      const northEast = getNorthEast(rowIndex, columnIndex);
      const northWest = getNorthWest(rowIndex, columnIndex);
      const southEast = getSouthEast(rowIndex, columnIndex);
      const southWest = getSouthWest(rowIndex, columnIndex);

      return {
        north,
        south,
        east,
        west,
        northWest,
        northEast,
        southEast,
        southWest,
      };
    }

    let newState = cells;
    for (let i = 0; i < numberOfRows; i++) {
      for (let j = 0; j < numberOfColumns; j++) {
        const cellNeighbours = getNeighbours(i, j);

        // console.group(`(${i},${j})`);
        // console.log(cellNeighbours);
        // console.groupEnd();
        const liveNeighbours = Object.values(cellNeighbours).filter(
          (n) => n === 1
        );

        const current = cells[i][j];
        if (current === 1 && liveNeighbours.length < 2) {
          //underpopulation
          newState[i][j] = 0;
        } else if (
          current === 1 &&
          (liveNeighbours.length === 2 || liveNeighbours.length === 3)
        ) {
          // survive
          newState[i][j] = 1;
        } else if (current === 1 && liveNeighbours.length > 3) {
          //overpopulation

          newState[i][j] = 0;
        } else if (current === 0 && liveNeighbours.length === 3) {
          //reproduction

          newState[i][j] = 1;
        }
      }
    }

    setCells([...newState]);
  }, [cells, numberOfColumns, numberOfRows]);

  useEffect(() => {
    interval.current = setInterval(nextGeneration, INTERVAL);

    return () => clearInterval(interval.current);
  }, [nextGeneration]);
  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfColumns},1fr)`,
      }}
    >
      {cells.map((rows, rowIndex) => {
        return rows.map((column, columnsIndex) => (
          <Cell
            key={`${rowIndex}-${columnsIndex}`}
            status={cells[rowIndex][columnsIndex]}
            i={rowIndex}
            j={columnsIndex}
          />
        ));
      })}
    </div>
  );
}

function Cell({ status }) {
  return (
    <div
      style={{
        width: `${CELL_WIDTH}px`,
        height: `${CELL_WIDTH}px`,
        border: "1px solid black",
        backgroundColor: `${status === 0 ? "#000" : "#fff"}`,
        display: "grid",
      }}
    />
  );
}
export default App;
