import { BoardCellValues } from '@/components/board-cell';
import { findWinner } from '@/utils/findWinner';
import { useCallback, useMemo, useState } from 'react';

interface useMovesConfig {
  size: number;
}

export interface Move {
  player: number;
  location: number;
  value: BoardCellValues;
}

interface Props {
  size: number;
  boxes: (BoardCellValues | null)[];
  moves: Move[];
  handlePlayerSelect: ({ player, location }: Omit<Move, 'value'>) => void;
  winner: number | null;
  restart: () => void;
}

const findMoveByLocation = (moves: Move[], location: number) => {
  return moves.find(x => x.location == location);
};

const useTicTacToe = ({ size }: useMovesConfig): Props => {
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

  const winner: number | null = useMemo(() => {
    return findWinner(moves, size);
  }, [moves]);

  const handlePlayerSelect = useCallback(
    ({ player, location }: Omit<Move, 'value'>) => {
      if (winner) {
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
  };
};

export { useTicTacToe };
