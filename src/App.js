import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";
import Setting from "./Setting";
import Numbers from "./Numbers";

function getSettingsFromQueryParams() {
  const defaultSettings = {
    time: 200,
    cellWidth: 10,
    initialLivePercent: 10,
  };
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const newSettings = { ...defaultSettings, ...params };
  return newSettings;
}
function App() {
  const [numberOfRows, setNumberOfRows] = useState(0);
  const [numberOfColumns, setNumberOfColumns] = useState(0);
  const [cells, setCells] = useState([]);
  const interval = useRef();
  const [setting] = useState(() => getSettingsFromQueryParams());
  const [population, setPopulation] = useState(0);
  const [generation, setGeneration] = useState(0);
  const [generationPopulation, setGenerationPopulation] = useState([]);
  const [populationChangePercent, setPopulationChangePercent] = useState(0);

  useEffect(() => {
    const rows = Math.round(window.innerHeight / setting.cellWidth);
    const columns = Math.round(window.innerWidth / setting.cellWidth);
    setNumberOfRows(rows);
    setNumberOfColumns(columns);
  }, [setting.cellWidth]);

  useEffect(() => {
    const _cells = new Array(numberOfRows);
    let _population = 0;
    for (let i = 0; i < numberOfRows; i++) {
      _cells[i] = new Array(numberOfColumns).fill(0, 0);
      for (let j = 0; j < numberOfColumns; j++) {
        _cells[i][j] =
          Math.random() * numberOfRows * numberOfColumns <
          (numberOfColumns * numberOfRows * setting.initialLivePercent) / 100
            ? 1
            : 0;
        if (_cells[i][j] === 1) {
          _population++;
        }
      }
    }

    setCells(_cells);
    setPopulation(_population);
  }, [numberOfRows, numberOfColumns, setting.initialLivePercent]);

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
    let _population = population;
    for (let i = 0; i < numberOfRows; i++) {
      for (let j = 0; j < numberOfColumns; j++) {
        const cellNeighbours = getNeighbours(i, j);
        const liveNeighbours = Object.values(cellNeighbours).filter(
          (n) => n === 1
        );

        const current = cells[i][j];
        if (current === 1 && liveNeighbours.length < 2) {
          //underpopulation
          newState[i][j] = 0;
          _population--;
        } else if (
          current === 1 &&
          (liveNeighbours.length === 2 || liveNeighbours.length === 3)
        ) {
          // survive
          newState[i][j] = 1;
        } else if (current === 1 && liveNeighbours.length > 3) {
          //overpopulation

          newState[i][j] = 0;
          _population--;
        } else if (current === 0 && liveNeighbours.length === 3) {
          //reproduction

          newState[i][j] = 1;
          _population++;
        }
      }
    }

    setCells([...newState]);
    setGenerationPopulation([
      ...generationPopulation,
      { generation, population },
    ]);
    setPopulationChangePercent(
      Math.round(((_population - population) / population) * 100)
    );
    setPopulation(_population);
    setGeneration(generation + 1);
  }, [
    cells,
    numberOfColumns,
    numberOfRows,
    population,
    generation,
    generationPopulation,
  ]);

  useEffect(() => {
    interval.current = setInterval(nextGeneration, setting.time);

    return () => clearInterval(interval.current);
  }, [nextGeneration, setting.time]);

  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${numberOfColumns},1fr)`,
      }}
    >
      <Setting {...setting} />
      {cells.map((rows, rowIndex) => {
        return rows.map((column, columnsIndex) => (
          <Cell
            key={`${rowIndex}-${columnsIndex}`}
            status={cells[rowIndex][columnsIndex]}
            cellWidth={setting.cellWidth}
          />
        ));
      })}
      <Numbers
        population={population}
        generation={generation}
        generationPopulation={generationPopulation}
        populationChangePercent={populationChangePercent}
      />
    </div>
  );
}

function Cell({ status, cellWidth }) {
  return (
    <div
      style={{
        width: `${cellWidth}px`,
        height: `${cellWidth}px`,
        border: "1px solid black",
        backgroundColor: `${status === 0 ? "#000" : "#fff"}`,
        display: "grid",
      }}
    />
  );
}
export default App;
