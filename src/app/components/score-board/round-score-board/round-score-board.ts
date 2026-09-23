import {Component, Input} from '@angular/core';
import {Move} from '../../../data/move.enum';

@Component({
  imports: [],
  selector: 'app-round-score-board',
  styleUrl: './round-score-board.css',
  templateUrl: './round-score-board.html',
})

export class RoundScoreBoardComponent {

  moveEmoji: Record<Move, string> = {
    [Move.Rock]: '✊',
    [Move.Paper]: '✋',
    [Move.Scissors]: '✌️'
  };

  @Input()
  public playerMove: Move | null = null;

  @Input()
  public opponentMove: Move | null = null;

}
