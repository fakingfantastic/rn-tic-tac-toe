import { Move } from '@/hooks/use-tic-tac-toe';
import { findWinner } from './findWinner';

describe('check for a winner', () => {
  it('can find a column winner', () => {
    const moves: Move[] = [
      { location: 0, player: 1, value: 'o' },
      { location: 1, player: 2, value: 'x' },
      { location: 3, player: 1, value: 'o' },
      { location: 6, player: 1, value: 'o' },
    ];

    expect(findWinner(moves, 3)?.player).toBe(1);
  });

  it('can find a row winner', () => {
    const moves: Move[] = [
      { location: 0, player: 1, value: 'o' },
      { location: 4, player: 2, value: 'x' },
      { location: 1, player: 1, value: 'o' },
      { location: 2, player: 1, value: 'o' },
    ];

    expect(findWinner(moves, 3)?.player).toBe(1);
  });

  it('can find a diagonal winner', () => {
    const moves: Move[] = [
      { location: 0, player: 1, value: 'o' },
      { location: 1, player: 2, value: 'x' },
      { location: 4, player: 1, value: 'o' },
      { location: 8, player: 1, value: 'o' },
    ];

    expect(findWinner(moves, 3)?.player).toBe(1);
  });

  it('can handle a different board size from the default', () => {
    const moves: Move[] = [
      { location: 0, player: 1, value: 'o' },
      { location: 5, player: 1, value: 'o' },
      { location: 1, player: 2, value: 'x' },
      { location: 10, player: 1, value: 'o' },
      { location: 11, player: 1, value: 'x' },
      { location: 15, player: 1, value: 'o' },
      { location: 20, player: 1, value: 'o' },
    ];

    expect(findWinner(moves, 5)?.player).toBe(1);
  });
});
