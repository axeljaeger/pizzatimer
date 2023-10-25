import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, OnDestroy {
  private stream : MediaStream | undefined;
  private intervalSubscription : any;


  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
    this.stream?.getTracks().forEach(track => track.stop());
    const video = this.videoTag();
    if (video) {
      video.srcObject = null;
    }
  }

  async ngOnInit() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: {facingMode: "environment"} });  
    const video = this.videoTag();
    if (video && this.stream) {
      video.srcObject = this.stream;
    }

    // @ts-ignore
    const barcodeDetector = new BarcodeDetector({
      formats: ["code_39", "codabar", "ean_13"],
    });

    this.intervalSubscription = interval(100).subscribe(async () => {
      const video = this.videoTag();
      if (! video?.paused) {
        const detectedCodes = await barcodeDetector.detect(video);
        for (const barcode of detectedCodes) {
          this.codeDetected.emit(barcode.rawValue);
        }
      }
    });
  
  }
  @Output()
  codeDetected = new EventEmitter<string>();

  videoTag() {
    return  document.querySelector("video");
  }

}
