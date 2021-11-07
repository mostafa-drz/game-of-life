# Conway's Game of Life

![game-of-life](https://user-images.githubusercontent.com/25212827/140632038-108f53db-6a66-4cd9-942f-cff728d7649d.gif)


> The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.[1] It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.

A Game of life implementation by React. You can learn more about Game of life on [Wikipedi](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) but in summary it's a game designed by Conway in 1970.

This game has 4 main rules which are:

> 1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
> 2. Any live cell with two or three live neighbours lives on to the next generation.
> 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
> 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

It was interesting to me, because I think these rules apply to many things in life! There are very interesting patterns that can happen in this game! I'll encourage you to read the Wikipedia about properties of some of these patterns.

## Demo

You can see a demo [here](https://mostafa-drz.github.io/game-of-life/)

## How to run on local?

1. Clone the repository

```
git clone https://github.com/mostafa-drz/game-of-life.git
```

2. Install dependencies

```
yarn install
```

3. Run the app

```
yarn start
```

It should open a new tab on `http://localhost:3000`
