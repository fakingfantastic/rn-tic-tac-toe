import { BoardCellValues } from '@/components/board-cell';
import { useCallback, useMemo, useState } from 'react';

interface useMovesConfig {
  size: number;
}

interface Move {
  player: number;
  location: number;
  value: BoardCellValues;
}

interface Props {
  boxes: (BoardCellValues | null)[];
  moves: Move[];
  handlePlayerSelect: (index: number) => void;
}

const useMoves = ({ size }: useMovesConfig): Props => {
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

  const handlePlayerSelect = useCallback((location: number) => {
    setMove(currentMoves => {
      const move: Move = {
        player:
          currentMoves.length == 0 || currentMoves[currentMoves.length - 1].player == 2 ? 1 : 2,
        location,
        value:
          currentMoves.length == 0 || currentMoves[currentMoves.length - 1].value == 'o'
            ? 'x'
            : 'o',
      };

      return [...currentMoves, move];
    });
  }, []);

  return {
    boxes,
    moves,
    handlePlayerSelect,
  };
};

export { useMoves };
