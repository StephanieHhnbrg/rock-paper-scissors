import { Service } from '@angular/core';
import {Move} from '../data/move.enum';
import {FilesetResolver, HandLandmarker, HandLandmarkerResult} from '@mediapipe/tasks-vision';
@Service()
export class GestureDetector {

  private handLandmarker?: HandLandmarker;

  public async initialize() {
    if (this.handLandmarker) {
      return
    }

    try {
      const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm');
      this.handLandmarker = await HandLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath: '/models/hand_landmarker.task'
          },
          runningMode: 'VIDEO',
          numHands: 1
        }
      );
    } catch (error) {
      console.error('Failed to initialize MediaPipe:', error);
    }
  }

  public detectGesture(video: HTMLVideoElement, timestamp: number): Move | null {
    if (!this.handLandmarker) {  return null; }
    const result = this.handLandmarker.detectForVideo(video, timestamp);

    if (!result.landmarks.length) { return null;}
    return this.classify(result);
  }

  // https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer#hand_landmark_model_bundle
  private getFingerStates(landmarks: any[]) {
    return {
      index: this.isFingerExtended(landmarks, 8),
      middle: this.isFingerExtended(landmarks, 12),
      ring: this.isFingerExtended(landmarks, 16),
      pinky: this.isFingerExtended(landmarks, 20)
    };
  }

  private isFingerExtended(landmarks: any[], tip: number): boolean {
    const tipPoint = landmarks[tip];
    const pipPoint = landmarks[tip - 2];
    const tipDistance = this.distance(tipPoint, landmarks[0]);
    const pipDistance = this.distance(pipPoint, landmarks[0]);
    return tipDistance > pipDistance;
  }
  private distance(a: any, b: any): number {
    return Math.sqrt(
      Math.pow(a.x - b.x, 2) +
      Math.pow(a.y - b.y, 2)
    );
  }

  private classify(result: HandLandmarkerResult): Move | null {
    const landmarks = result.landmarks[0];
    const fingers = this.getFingerStates(landmarks);
    const extendedCount = Number(fingers.index) + Number(fingers.middle) + Number(fingers.ring) + Number(fingers.pinky);

    if (extendedCount === 0) {  return Move.Rock; }
    if (extendedCount === 4) { return Move.Paper; }
    if (fingers.index && fingers.middle && !fingers.ring && !fingers.pinky) {
      return Move.Scissors;
    }

    return null;
  }

}
