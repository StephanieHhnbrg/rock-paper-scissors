import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Move} from '../../data/move.enum';
import {GameEngine} from '../../services/game-engine';
import {GestureDetector} from '../../services/gesture-detector';
@Component({
  imports: [],
  selector: 'app-camera',
  styleUrl: './camera.css',
  templateUrl: './camera.html',
})
export class CameraComponent {

  @ViewChild('video')
  private video!: ElementRef<HTMLVideoElement>;

  private stream: MediaStream | null = null;
  public isCameraOff = true;

  @Input()
  public move: Move | null = null;

  @Output()
  public moveChange = new EventEmitter<Move>();

  @Output()
  public onCameraToggle = new EventEmitter<boolean>();

  private animationFrame?: number;
  private detecting = false;
  private gestureHistory: (Move | null)[] = [];
  private readonly REQUIRED_FRAMES = 6;

  constructor(private gameEngine: GameEngine,
              private gestureDetector: GestureDetector,
              private cdr: ChangeDetectorRef) {}


  public async toggleCamera() {
    if (this.isCameraOff) {
      this.openCamera();
    } else {
      this.stopCamera();
    }

  }

  private async openCamera() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'
      },
      audio: false
    });

    this.video.nativeElement.srcObject = this.stream;
    this.isCameraOff = false;
    this.onCameraToggle.emit(true);
    this.gestureDetector.initialize();
    this.cdr.markForCheck();
  }

  private stopCamera() {
    this.stream?.getTracks().forEach(track => track.stop());
    this.stream = null;
    this.video.nativeElement.srcObject = null;
    this.isCameraOff = true;
    this.onCameraToggle.emit(false);
    this.cdr.markForCheck();
  }

  public startDetection() {
    if (this.detecting) { return; }
    this.detecting = true;
    const video = this.video.nativeElement;
    const detect = (timestamp: number) => {
      if (!this.detecting) return;
      let updatedMove = this.getStableGesture(this.gestureDetector.detectGesture(video, timestamp));
      if (this.move != updatedMove && updatedMove != null) {
        this.move = updatedMove;
        this.moveChange.emit(this.move);
      }
      this.animationFrame = requestAnimationFrame(detect);
    };

    this.animationFrame = requestAnimationFrame(detect);
  }

  public stopDetection() {
    this.detecting = false;

    if (this.animationFrame !== undefined) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
  }

  private getStableGesture(newGesture: Move | null): Move | null {
    this.gestureHistory.push(newGesture);
    if (this.gestureHistory.length > this.REQUIRED_FRAMES) { this.gestureHistory.shift(); }
    if (this.gestureHistory.length === this.REQUIRED_FRAMES) {
      const first = this.gestureHistory[0];
      const stable = first !== null && this.gestureHistory.every(g => g === first);
      if (stable) { return first; }
    }
    return null;
  }

}
