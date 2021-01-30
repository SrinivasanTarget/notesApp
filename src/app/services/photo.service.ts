import { Injectable } from '@angular/core';
import {
  Plugins, CameraResultType, Capacitor, FilesystemDirectory,
  CameraPhoto, CameraSource
} from '@capacitor/core';
import { Photo } from './Photo';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  [x: string]: any;

  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";

  constructor() {
  }

  public async addNewToGallery() {
    const capturedPhoto = await this.getPhoto();
    const savedImageFile = await this.savePicture(capturedPhoto);

    this.photos.unshift(savedImageFile);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    const base64Data = await this.readAsBase64(cameraPhoto);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await this.writeFile(fileName, base64Data);

    return {
      filepath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    console.log('====================================');
    console.log(cameraPhoto);
    console.log('====================================');
    const file = await Filesystem.readFile({
      path: cameraPhoto.path
    });

    return file.data;
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async loadSaved() {
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    for (let photo of this.photos) {
      const readFile = await Filesystem.readFile({
        path: photo.filepath,
        directory: FilesystemDirectory.Data
      });

      photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
    }
  }

  public async getPhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    return capturedPhoto;
  }

  public async writeFile(fileName, base64Data) {
    return await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
  }
}
