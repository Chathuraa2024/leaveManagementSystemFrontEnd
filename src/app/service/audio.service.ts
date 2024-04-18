import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio = new Audio();

  constructor() {

  }

  playSoundWelcome(): void {
    this.audio.src = '/assets/welcome.mp3';
    this.audio.load();
    this.audio.play().catch(error => console.error("Error playing the sound.", error));
  }

  playButton(): void{
    this.audio.src = '/assets/buttonClick.mp3';
    this.audio.load();
    this.audio.play().catch(error => console.error("Error playing the sound.", error));
  }
  playSuccess(): void{
    this.audio.src = '/assets/success.mp3';
    this.audio.load();
    this.audio.play().catch(error => console.error("Error playing the sound.", error));
  }
  playWrong(): void{
    this.audio.src = '/assets/wrong.wav';
    this.audio.load();
    this.audio.play().catch(error => console.error("Error playing the sound.", error));
  }
}
