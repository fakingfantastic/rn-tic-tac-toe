import { Move } from './use-board-moves';

interface Props {
  makeMove: (moves: Move[]) => Omit<Move, 'value'>;
}

const useOpponent = ({ opponentId, size }: { opponentId: number; size: number }): Props => {
  const makeMove = (moves: Move[]) => {
    const selectedLocations = moves.map(x => x.location);

    // TODO Refine opponent selection logic
    const availableLocations = [...Array(size * size)]
      .map((_, i) => i + 1)
      .filter(x => !selectedLocations.includes(x));

    return {
      player: opponentId,
      location: availableLocations[Math.floor(Math.random() * availableLocations.length)],
    };
  };

  return { makeMove };
};

export { useOpponent };
