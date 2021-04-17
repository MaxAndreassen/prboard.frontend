import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Upload, FileToShow, FileSummary } from '../../models/file.models';
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  mbInBytes = 1048576;

  @Input() multiple = false;
  @Input() name = 'File Upload';
  @Input() maximum: number;
  @Input() image: boolean;
  @Input() video: boolean;
  @Input() zip: boolean;
  @Input() required: boolean;
  @Input() description: string;
  @Input() existingFiles: FileSummary[] = [];
  @Input() maxFileSizeMB = 20;

  @Output() uploadsChanged: EventEmitter<Upload[]> = new EventEmitter();
  @Output() existingFilesChanged: EventEmitter<FileSummary[]> = new EventEmitter();

  uploads: Upload[] = [];

  filesToShow: FileToShow[] = [];

  failureMessage: string;
  failureSubText: string;

  constructor(private imageCompress: NgxImageCompressService) { }

  ngOnInit(): any {
    if (this.existingFiles) {
      for (const file of this.existingFiles) {
        const fileToShow = new FileToShow();
        fileToShow.identifier = file.uuid;
        fileToShow.format = file.format;
        fileToShow.url = file.url;
        fileToShow.type = 'existing';
        this.filesToShow.push(fileToShow);
      }
    }
  }

  preview(event): any {
    this.failureMessage = null;
    this.failureSubText = null;

    if (!!this.maximum && this.uploads.length >= this.maximum) {
      return;
    }

    const file = event.target.files && event.target.files[0];

    if (file) {
      const upload = new Upload();
      const reader = new FileReader();
      upload.file = file;

      if (file.type.indexOf('image') > -1 && this.image) {
        upload.format = 'image';
      } else if (file.type.indexOf('video') > -1 && this.video) {
        upload.format = 'video';
      } else if (file.type.indexOf('zip') > -1 && this.zip) {
        upload.format = 'zip';
      }

      if (!upload.format) {
        this.failureMessage = 'Invalid file type.';
        this.failureSubText = null;
        return;
      }

      reader.readAsDataURL(file);

      reader.onload = (event2: any) => {

        console.log(event2);

        // tslint:disable-next-line
        this.compressFile((event2.target as FileReader).result, event.target.files[0]['name'], upload);
      };
    }
  }

  remove(fileToShow: FileToShow): any {
    if (fileToShow.type === 'new') {
      this.uploads = this.uploads.filter(p => p.tempId !== fileToShow.identifier);
      this.uploadsChanged.emit(this.uploads);
    }

    if (fileToShow.type === 'existing') {
      this.existingFiles = this.existingFiles.filter(p => p.uuid !== fileToShow.identifier);
      this.existingFilesChanged.emit(this.existingFiles);
    }

    this.filesToShow = this.filesToShow.filter(p => p.identifier !== fileToShow.identifier);
  }

  uuidv4(): any {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      /* tslint:disable */
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      /* tslint:enable */
      return v.toString(16);
    });
  }


  compressFile(image, fileName, upload: Upload): any {
    const reader = new FileReader();

    const orientation = -1;
    const sizeOfOriginalImage = this.imageCompress.byteCount(image);

    let resize = 70;

    if (sizeOfOriginalImage > 4000000) {
      resize = 50;
    }

    console.warn('Size in bytes is now:', sizeOfOriginalImage);
    this.imageCompress.compressFile(image, orientation, resize, resize).then(
      compressedImage => {
        const sizeOFCompressedImage = this.imageCompress.byteCount(compressedImage);
        console.warn('Size in bytes after compression:', sizeOFCompressedImage);
        // create file from byte
        const imageName = fileName;
        // imageFile created below is the new compressed file which can be send to API in form data
        const imageFile = this.dataURLtoFile(compressedImage, fileName);

        reader.readAsDataURL(imageFile);

        reader.onload = (event2: any) => {
          const result = compressedImage;

          if (!result) {
            this.failureMessage = 'Unable to read file.';
            this.failureSubText = null;
            return;
          }

          // @ts-ignore
          upload.fileSize = Math.round((result.length * 2) / this.mbInBytes * 100) / 100;

          // @ts-ignore
          if (result.length * 2 > this.mbInBytes * this.maxFileSizeMB) {
            this.failureMessage = `File exceeds the maximum size limit.`;
            // @ts-ignore
            this.failureSubText = `Limit: ${this.maxFileSizeMB}mb. File Size: ${upload.fileSize}mb.`;
            return;
          }

          console.log(event2);

          upload.file = imageFile;
          upload.url = compressedImage;
          upload.tempId = this.uuidv4();

          const fileToShow = new FileToShow();
          fileToShow.identifier = upload.tempId;
          fileToShow.format = upload.format;
          fileToShow.url = upload.url;
          fileToShow.type = 'new';
          fileToShow.fileSize = upload.fileSize;

          if (this.multiple) {
            this.uploads.push(upload);
            this.filesToShow.push(fileToShow);
          }
          else {
            this.uploads[0] = upload;
            this.filesToShow[0] = fileToShow;
          }

          this.uploadsChanged.emit(this.uploads);
        };
      });
  }

  dataURItoBlob(dataURI): any {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  dataURLtoFile(dataurl, filename): any {

    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
