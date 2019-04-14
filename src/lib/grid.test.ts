import {
  getColunmSlotAvailableIndex,
  getGrid,
  getGridStatus,
  getTransposedGrid
} from '../../src/lib/grid';
import { CoinSlot, GameResult } from '../../src/types';

describe('Grid lib stuff', () => {
  describe('getGrid', () => {
    it('should return an empty grid', () => {
      const result = getGrid().every((column) => column.every((slot) => slot === CoinSlot.Blank));
      expect(result).toEqual(true);
    });
  });

  describe('getColunmSlotAvailableIndex', () => {
    it('should return a valid index', () => {
      const result = getColunmSlotAvailableIndex([
        CoinSlot.Blank,
        CoinSlot.Blank,
        CoinSlot.Blank,
        CoinSlot.Player1
      ]);
      expect(result).toEqual(2);
    });
  });

  describe('getTransposedGrid', () => {
    it('should return an empty grid', () => {
      const grid = getGrid();

      grid[0][0] = CoinSlot.Player1;
      grid[0][1] = CoinSlot.Player1;
      grid[0][2] = CoinSlot.Player1;
      grid[0][3] = CoinSlot.Player1;

      const result = getTransposedGrid(grid);

      expect(result[0][0]).toEqual(CoinSlot.Player1);
      expect(result[1][0]).toEqual(CoinSlot.Player1);
      expect(result[2][0]).toEqual(CoinSlot.Player1);
      expect(result[3][0]).toEqual(CoinSlot.Player1);
    });
  });

  describe('getGridStatus', () => {
    describe('when no 4 matching adjacent tokens are detected', () => {
      it('should return CoinSlot.Blank', () => {
        const grid = getGrid();
        const result = getGridStatus(grid);

        expect(result).toEqual(GameResult.InProgress);
      });
    });

    describe('when vertical connection by player 1 is detected', () => {
      it('should return CoinSlot.Player1', () => {
        const grid = getGrid();

        grid[0][0] = CoinSlot.Player1;
        grid[0][1] = CoinSlot.Player1;
        grid[0][2] = CoinSlot.Player1;
        grid[0][3] = CoinSlot.Player1;

        const result = getGridStatus(grid);

        expect(result).toEqual(CoinSlot.Player1);
      });
    });

    describe('when horizontal connection by player 1 is detected', () => {
      it('should return CoinSlot.Player1', () => {
        const grid = getGrid();

        grid[0][0] = CoinSlot.Player1;
        grid[1][0] = CoinSlot.Player1;
        grid[2][0] = CoinSlot.Player1;
        grid[3][0] = CoinSlot.Player1;

        const result = getGridStatus(grid);

        expect(result).toEqual(CoinSlot.Player1);
      });
    });

    describe('when down right connection by player 1 is detected', () => {
      it('should return CoinSlot.Player1', () => {
        const grid = getGrid();

        grid[0][0] = CoinSlot.Player1;
        grid[1][1] = CoinSlot.Player1;
        grid[2][2] = CoinSlot.Player1;
        grid[3][3] = CoinSlot.Player1;

        const result = getGridStatus(grid);

        expect(result).toEqual(CoinSlot.Player1);
      });
    });

    describe('when up right connection by player 1 is detected', () => {
      it('should return CoinSlot.Player1', () => {
        const grid = getGrid();

        grid[0][3] = CoinSlot.Player1;
        grid[1][2] = CoinSlot.Player1;
        grid[2][1] = CoinSlot.Player1;
        grid[3][0] = CoinSlot.Player1;

        const result = getGridStatus(grid);

        expect(result).toEqual(CoinSlot.Player1);
      });
    });
  });
});
