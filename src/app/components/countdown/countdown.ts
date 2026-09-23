import { Component, signal } from '@angular/core';
@Component({
  imports: [],
  selector: 'app-countdown',
  styleUrl: './countdown.css',
  templateUrl: './countdown.html',
})
export class CountdownComponent {

  countdownStarted = signal(false);
  countdown = signal("");

  public async startCountdown() {
    this.countdownStarted.update(_ => true);
    for (let i = 3; i >= 1; i--) {
      this.countdown.update(_ => String(i));
      await this.wait(2000);
    }
    this.countdown.update(_ => "");
    this.countdownStarted.update(_ => false);
  }

  private wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
