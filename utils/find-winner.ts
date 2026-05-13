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

    // Checking left-most row position
    if (move.location % size === 0) {
      const rowWinner = findRowWinner(moves, move, size);
      if (rowWinner) {
        return rowWinner;
      }
    }

    // Check Down
    if (move.location < size) {
      const colWinner = findColumnWinner(moves, move, size);
      if (colWinner) {
        return colWinner;
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

export { findWinner };
