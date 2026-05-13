import { Move, Winner } from '@/hooks/use-tic-tac-toe';

const findWinner = (moves: Move[], size: number): Winner | null => {
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

      if (move.location === 0 || move.location === size - 1) {
        const diagonalWinner = findDiagonalWinner(moves, move, size);
        if (diagonalWinner) {
          return diagonalWinner;
        }
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
  let playerMoves: Move[] = [];
  for (let i = move.location; i < move.location + size; i++) {
    const moveAtLocation = moves.find(x => x.location === i);
    if (moveAtLocation) {
      playerMoves.push(moveAtLocation);
    }
  }

  if (playerMoves.length === size) {
    if ([...new Set(playerMoves.map(x => x.player))].length === 1) {
      return { player: playerMoves[0].player, moves: playerMoves };
    }
  }
};

const findColumnWinner = (moves: Move[], move: Move, size: number) => {
  let playerMoves: Move[] = [];
  for (let i = move.location; i < size * size; i = i + size) {
    const moveAtLocation = moves.find(x => x.location === i);
    if (moveAtLocation) {
      playerMoves.push(moveAtLocation);
    }
  }

  if (playerMoves.length === size) {
    if ([...new Set(playerMoves.map(x => x.player))].length === 1) {
      return { player: playerMoves[0].player, moves: playerMoves };
    }
  }
};

const findDiagonalWinner = (moves: Move[], move: Move, size: number) => {
  let playerMoves: Move[] = [];
  let interval;
  if (move.location === 0) {
    interval = size + 1;
  } else {
    interval = size - 1;
  }

  for (let i = move.location; i < size * size; i = i + interval) {
    const moveAtLocation = moves.find(x => x.location === i);
    if (moveAtLocation) {
      playerMoves.push(moveAtLocation);
    }
  }

  if (playerMoves.length === size) {
    if ([...new Set(playerMoves.map(x => x.player))].length === 1) {
      return { player: playerMoves[0].player, moves: playerMoves };
    }
  }
};

export { findWinner };
