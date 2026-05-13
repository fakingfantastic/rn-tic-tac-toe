import { BoardCellValues } from '@/components/board-cell';
import { findWinner } from '@/utils/findWinner';
import { useCallback, useMemo, useState } from 'react';

interface useMovesConfig {
  size: number;
  players: number[];
}

export interface Move {
  player: number;
  location: number;
  value: BoardCellValues;
}

export interface Winner {
  player: number;
  moves: Move[];
}
interface Props {
  size: number;
  boxes: (BoardCellValues | null)[];
  moves: Move[];
  handlePlayerSelect: ({ player, location }: Omit<Move, 'value'>) => void;
  winner: Winner | null;
  restart: () => void;
  currentPlayer: number | null;
  isGameOver: boolean;
}

const findMoveByLocation = (moves: Move[], location: number) => {
  return moves.find(x => x.location == location);
};

const useTicTacToe = ({ size, players }: useMovesConfig): Props => {
  const [moves, setMove] = useState<Move[]>([]);

  const boxes = useMemo<(BoardCellValues | null)[]>(() => {
    const res = [...Array<Move | null>(size * size)]
      .map(x => null)
      .map((_, i) => {
        const moveAtLocation = moves.find(x => x.location == i);
        return moveAtLocation ? moveAtLocation.value : null;
      });

    return res;
  }, [moves]);

  const currentPlayer: number | null = useMemo(() => {
    return winner ? null : players[moves.length % players.length];
  }, [moves]);

  const winner: Winner | null = useMemo(() => {
    return findWinner(moves, size);
  }, [moves]);

  const isGameOver: boolean = useMemo(() => {
    return !!winner || moves.length === size * size;
  }, [moves]);

  const handlePlayerSelect = useCallback(
    ({ player, location }: Omit<Move, 'value'>) => {
      if (winner) {
        return;
      }

      if (currentPlayer !== player) {
        return;
      }

      setMove(currentMoves => {
        if (findMoveByLocation(currentMoves, location)) {
          throw new Error('Location already selected');
        }

        const move: Move = {
          player,
          location,
          value:
            currentMoves.length == 0 || currentMoves[currentMoves.length - 1].value == 'o'
              ? 'x'
              : 'o',
        };

        return [...currentMoves, move];
      });
    },
    [moves],
  );

  const restart = useCallback(() => {
    setMove([]);
  }, []);

  return {
    size,
    boxes,
    moves,
    handlePlayerSelect,
    winner,
    restart,
    currentPlayer,
    isGameOver,
  };
};

export { useTicTacToe };
