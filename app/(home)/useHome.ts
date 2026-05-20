import { players } from '@/constants/players';
import { useOpponent } from '@/hooks/use-opponent';
import { usePoints } from '@/hooks/use-points';
import { useTheme } from '@/hooks/use-theme';
import { useTicTacToe } from '@/hooks/use-tic-tac-toe';
import { useCallback, useEffect, useState } from 'react';

export function useHome() {
  const { points, addPoints } = usePoints();
  const theme = useTheme();
  const [boardKey, setBoardKey] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { moves, handlePlayerSelect, boxes, winner, size, currentPlayer, restart, isGameOver } =
    useTicTacToe({
      size: 3,
      players: [1, 2],
    });

  const { makeMove } = useOpponent({
    opponentId: players.OPPONENT_ID,
    size,
  });

  useEffect(() => {
    if (moves.length && moves.at(-1)?.player !== players.OPPONENT_ID && !isGameOver) {
      setTimeout(() => handlePlayerSelect(makeMove(moves)), Math.floor(Math.random() * 2000));
    }
  }, [moves, makeMove, handlePlayerSelect, isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      setShowModal(true);
    }
    if (winner?.player === 1) {
      addPoints(50);
    }
  }, [isGameOver, winner, addPoints]);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleRestart = useCallback(() => {
    setBoardKey(Math.random() * 1000);
    setShowModal(false);
    restart();
  }, [restart]);

  return {
    points,
    boardKey,
    showModal,
    handlePlayerSelect,
    handleRestart,
    handleClose,
    boxes,
    winner,
    size,
    currentPlayer,
    isGameOver,
  };
}
