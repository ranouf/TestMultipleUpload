import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnChanges {
  @Input() image: string;
  @Input() imageCount: number = 1;
  @Input() maximumSize: number;
  @Input() action: boolean;
  @Input() required: boolean;
  @Input() allowMultiple: boolean = false;
  @Input() accept: string;

  @Output() onFilesDropped: EventEmitter<File | File[]> = new EventEmitter<File | File[]>();
  @Output() onDeleted: EventEmitter<any> = new EventEmitter<any>();

  public selectedFiles: FileList;
  private originalImage: string;
  private originalImageCount: number;

  constructor(
  ) { }

  ngOnInit() {
    this.originalImage = this.image;
    this.originalImageCount = this.imageCount;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['image'] != null) {
      this.originalImage = changes['image'].currentValue;
    }
    if (changes['imageCount'] != null) {
      this.originalImageCount = changes['imageCount'].currentValue;
    }
  }

  public async onFileChanged(event) {
    console.log('[image-upload]', event);
    this.selectedFiles = event.target.files;
    if (!this.selectedFiles || this.selectedFiles.length <= 0) {
      return;
    }

    if (this.allowMultiple) {
      let result: File[] = <File[]>[];
      for (var i = 0; i < this.selectedFiles.length; i++) {
        let file = this.selectedFiles[i];
        if (!this.checkSize(file)) return;
        result.push(file);
      }
      this.onFilesDropped.emit(result);
    } else {
      this.onFilesDropped.emit(this.selectedFiles[0]);
    }

    this.image = await this.readFile(this.selectedFiles[0]);
    this.imageCount = this.selectedFiles.length;
  }

  delete() {
    this.onFilesDropped.emit(undefined);
    this.image = undefined;
    this.imageCount = 0;
    this.originalImage = undefined;
    this.originalImageCount = 0;
    this.selectedFiles = undefined;
    this.onDeleted.emit(undefined);
    console.log("Files deleted");
  }

  public clearFiles() {
    this.selectedFiles = undefined;
    this.onFilesDropped.emit(undefined);
    this.image = this.originalImage;
    this.imageCount = this.originalImageCount;
    console.log('[image-upload] - File(s) cleared');
  }

  private checkSize(file: File): boolean {
    if (this.maximumSize && file.type.startsWith("image/") && file.size > this.maximumSize) {
      let errorMessage = "The file can't be more than " + Math.round((this.maximumSize / 1000) * 100) / 100 + " kb";
      console.error(errorMessage);
      return false;
    }
    return true;
  }

  private readFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result.toString())
      };
      fr.readAsDataURL(file);
    });
  }
}
