import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() {

  }

  playSoundWelcome(): void {
    var audio = new Audio('/assets/welcome.mp3');
    audio.play().catch(error => console.error("Error playing the sound.", error));
  }

  playButton(): void{
    var audio = new Audio('/assets/buttonClick.mp3');
    audio.play().catch(error => console.error("Error playing the sound.", error));
  }
  playSuccess(): void{
    var audio = new Audio('/assets/success.mp3');
    audio.play().catch(error => console.error("Error playing the sound.", error));
  }
  playWrong(): void {
    var audio = new Audio('/assets/wrong.wav');
    audio.play().catch(error => console.error("Error playing the sound.", error));
  }

  deleteEmp(): void{
    var audio = new Audio('/assets/deleteEmp.mp3');
    audio.play().catch(error => console.error("Error playing the sound.", error));
  }
}
