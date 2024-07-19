import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  ttitle = 'counter';
  counter: number = 0;
  isPaused: boolean = true;
  delay: number = 1; // Default delay in seconds
  intervalId: any;

  sound = false;

  incrementSound = new Audio('assets/sound2.mp3');

  ngOnInit() {
    this.startAutoIncrement();
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  increment() {
    this.counter += 1;
    if(this.sound)
    this.playSound(this.incrementSound);
  }

  decrement() {
    this.counter -= 1;
  }

  reset() {
    this.counter = 0;
    
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      this.clearInterval();
    } else {
      this.startAutoIncrement();
    }
  }

  setDelay() {
    if (!this.isPaused) {
      this.clearInterval();
      this.startAutoIncrement();
    }
  }

  startAutoIncrement() {
    this.clearInterval();
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.increment();
      }
    }, this.delay * 1000);
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  soundEvent(): void {
    this.sound = !this.sound;
  }

  playSound(sound: HTMLAudioElement) {
    sound.currentTime = 0; // Restart the audio from the beginning
    sound.play(); // Start playing the sound
  
    // Pause the sound after a short delay
    setTimeout(() => {
      sound.pause(); // Pause the sound
    }, 800 ); // Delay duration in milliseconds
  }
  
}
