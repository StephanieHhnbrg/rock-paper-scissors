import { Service } from '@angular/core';
import {Move} from '../data/move.enum';
import {Result} from '../data/result.enum';

@Service()
export class GameEngine {

  public randomMove(): Move {
    const moves = Object.values(Move);
    const selected = Math.floor(Math.random() * moves.length);
    return moves[selected];
  }

  public hasPlayerWonAgainstOpponent(player: Move | null, opponent: Move): Result {
    if (player === opponent) {
      return Result.DRAW;
    }

    if (
      (player === Move.Rock && opponent === Move.Scissors) ||
      (player === Move.Paper && opponent === Move.Rock) ||
      (player === Move.Scissors && opponent === Move.Paper)
    ) {
      return Result.WON;
    }

    return Result.LOST;
  }
}

