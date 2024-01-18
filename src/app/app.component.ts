import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { WelcomeComponent } from './welcome/welcome.component';
import { TimerComponent } from './timer/timer.component';
import { CameraComponent } from './camera/camera.component';


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
    imports: [MatButtonModule, WelcomeComponent, TimerComponent, CameraComponent]
})
export class AppComponent {
  stream: MediaStream | undefined;
    
  public devices: MediaDeviceInfo[] = [];

  public cameraList = new FormControl()
  public detectedCode : string = "";

  public applicationState = ApplicationState.Idle;
  public ApplicationState = ApplicationState;

  async openCamera() {
    this.applicationState = ApplicationState.Scanning;
  }

  setupTimer() {
    this.applicationState = ApplicationState.Timer;
  }
}
