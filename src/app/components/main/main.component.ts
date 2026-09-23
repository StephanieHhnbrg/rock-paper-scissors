import {ChangeDetectionStrategy, ChangeDetectorRef, Component, signal, ViewChild} from '@angular/core';
import {GameEngine} from '../../services/game-engine';
import {Move} from '../../data/move.enum';
import {Result} from '../../data/result.enum';
import {HeaderComponent} from '../header/header';
import {CameraComponent} from '../camera/camera';
import {CountdownComponent} from '../countdown/countdown';
import {TotalScoreBoardComponent} from '../score-board/total-score-board/total-score-board';
import {RoundScoreBoardComponent} from '../score-board/round-score-board/round-score-board';
import {StartButtonComponent} from '../start-button/start-button';

@Component({
  imports: [
    HeaderComponent,
    TotalScoreBoardComponent,
    RoundScoreBoardComponent,
    CameraComponent,
    CountdownComponent,
    StartButtonComponent
  ],
  selector: 'app-main-component',
  styleUrl: './main.component.css',
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {

  @ViewChild(CameraComponent) camera!: CameraComponent;
  @ViewChild(CountdownComponent) countdown!: CountdownComponent;
  @ViewChild(TotalScoreBoardComponent) scoreBoard!: TotalScoreBoardComponent;

  playerMove: Move | null = null;
  opponentMove: Move | null = null;
  result: Result | null = null;

  isRoundPlaying = false;

  isCameraReady = signal(false);

  constructor(private gameEngine: GameEngine,
              private cdr: ChangeDetectorRef) {}

  public async startRound() {
    if (this.isRoundPlaying || !this.isCameraReady) {
      return;
    }

    this.isRoundPlaying = true;
    this.playerMove = null;
    this.opponentMove = null;
    this.result = null;
    this.camera.startDetection();
    // TODO: roundScoreBoard shuffle Opponent Move
    await this.countdown.startCountdown();
    this.opponentMove = this.gameEngine.randomMove();
    this.cdr.markForCheck();
    this.camera.stopDetection();
    this.result = this.gameEngine.hasPlayerWonAgainstOpponent(this.playerMove, this.opponentMove);
    this.scoreBoard.updateScoreBoard(this.result);
    this.isRoundPlaying = false;
    console.log(this.result); // TODO: Display result animation
  }

  public onCameraToggle(isCameraOn: boolean) {
    this.isCameraReady.update(_ => isCameraOn);
  }

  // TODO: i18n
  // TODO: Deploy
  // TODO: Icon


}
