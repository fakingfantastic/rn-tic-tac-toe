import { Move } from '@/hooks/use-tic-tac-toe';

const findWinner = (moves: Move[], size: number): number | null => {
  if (moves.length < size) {
    return null;
  }

  for (let i = 0; i < size * size; i++) {
    const move = moves.at(i);
    if (!move) {
      continue;
    }

    // Check Down & Diagonal
    if (move.location < size) {
      const colWinner = findColumnWinner(moves, move, size);
      if (colWinner) {
        return colWinner;
      }

      const diagonalWinner = findDiagonalWinner(moves, move, size);
      if (diagonalWinner) {
        return diagonalWinner;
      }
    }

    // Checking left-most row position
    if (move.location % size === 0) {
      const rowWinner = findRowWinner(moves, move, size);
      if (rowWinner) {
        return rowWinner;
      }
    }
  }

  return null;
};

const findRowWinner = (moves: Move[], move: Move, size: number) => {
  let playerIdsForRow: number[] = [];
  for (let i = move.location; i < move.location + size; i++) {
    const moveAtLocation = moves.find(x => x.location === i);
    if (moveAtLocation) {
      playerIdsForRow.push(moveAtLocation.player);
    }
  }

  if (playerIdsForRow.length === size) {
    if ([...new Set(playerIdsForRow)].length === 1) {
      return playerIdsForRow[0];
    }
  }
};

const findColumnWinner = (moves: Move[], move: Move, size: number) => {
  let playerIdsForCol: number[] = [];
  for (let i = move.location; i < size * size; i = i + size) {
    const moveAtLocation = moves.find(x => x.location === i);
    if (moveAtLocation) {
      playerIdsForCol.push(moveAtLocation.player);
    }
  }

  if (playerIdsForCol.length === size) {
    if ([...new Set(playerIdsForCol)].length === 1) {
      return playerIdsForCol[0];
    }
  }
};

const findDiagonalWinner = (moves: Move[], move: Move, size: number) => {
  let playerIdsForDiagonal: number[] = [];
  let interval;
  if (move.location === 0) {
    interval = size + 1;
  } else {
    interval = size - 1;
  }

  for (let i = move.location; i < size * size; i = i + interval) {
    const moveAtLocation = moves.find(x => x.location === i);
    if (moveAtLocation) {
      playerIdsForDiagonal.push(moveAtLocation.player);
    }
  }

  if (playerIdsForDiagonal.length === size) {
    if ([...new Set(playerIdsForDiagonal)].length === 1) {
      return playerIdsForDiagonal[0];
    }
  }
};

export { findWinner };
