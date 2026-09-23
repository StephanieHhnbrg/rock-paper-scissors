import { Component, signal } from '@angular/core';
import {Result} from '../../../data/result.enum';

@Component({
  imports: [],
  selector: 'app-score-board',
  styleUrl: './total-score-board.css',
  templateUrl: './total-score-board.html',
})
export class TotalScoreBoardComponent {

  playerScore = signal(0);
  opponentScore = signal(0);

  public updateScoreBoard(result: Result) {
    if (result == Result.WON) {
      this.playerScore.update(value => value + 1);
    } else if (result == Result.LOST) {
      this.opponentScore.update(value => value + 1);
    }
  }


}
