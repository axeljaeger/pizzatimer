import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { interval } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf, NgStyle } from '@angular/common';


enum ApplicationState {
  Idle = 0,
  Scanning = 1,
  Timer = 2,
  TimerDone = 3
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgIf, MatIconModule, MatButtonModule, NgStyle, MatProgressSpinnerModule]
})
export class AppComponent {
  public devices: MediaDeviceInfo[] = [];

  public cameraList = new FormControl()
  public detectedCode : string = "";

  public applicationState = ApplicationState.Idle;

  async openCamera() {
    this.applicationState = ApplicationState.Scanning;

    const video = document.querySelector("video");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: {facingMode: "environment"} });


    if (video) {
      video.srcObject = stream;
    }
  
    // @ts-ignore
    const barcodeDetector = new BarcodeDetector({
      formats: ["code_39", "codabar", "ean_13"],
    });

    interval(100).subscribe(async () => {
      if (! video?.paused) {
        const detectedCodes = await barcodeDetector.detect(video);
        for (const barcode of detectedCodes) {
          this.detectedCode = barcode.rawValue;
          this.applicationState = ApplicationState.Timer;
        }
      }
    });
  
  }
}
