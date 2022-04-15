/* eslint-disable no-debugger */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('filePicker', { static: false })
  filePickerRef: ElementRef<HTMLInputElement>;
  selectedImage;
  usePicker = false;
  constructor(private platform: Platform) {}

  ngOnInit(): void {
    console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));

    if (this.platform.is('desktop')) {
      this.usePicker = true;
    }
  }
  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      return;
    }
    Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      width: 300,
      resultType: CameraResultType.DataUrl,
    })
      .then((image) => {
        this.selectedImage = image.dataUrl;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onFileChosen(event: Event) {
    console.log(event);
  }
}
