import { Component, OnInit, Input } from '@angular/core';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User2 } from '../_models/user2';
import { HttpService } from '../_services/http.service';
import { Photo } from '../_models/photo';
import { DB } from '../database';

import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { Tag } from '../_models/tag';

@Component({
    selector: 'app-add-photo-page',
    templateUrl: 'add-photo-page.component.html',
    styleUrls: ['./add-photo-page.component.css']
})
export class AddPhotoPageComponent implements OnInit {

    public uploader: FileUploader;
    public hasBaseDropZoneOver = false;
    private title2: string;
    public imageDataArray;

    addPhotoForm: FormGroup;
    loading = false;
    submitted = false;

    public startSize: number;
    public currentSize: number;
    public file_current_name: string;

    text_file_path: Input;
    updateFile = false;

    // tslint:disable-next-line:max-line-length
    ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    alphabet: String[];
    tagsAlphabet: Array<AlphTags> = [];

    tags: Tag[];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private httpService: HttpService,
        private alertService: AlertService,
        private cloudinary: Cloudinary) {
            this.title2 = '';
    }

    ngOnInit() {

        this.loadTags();

        this.addPhotoForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        });

        this.loadDB();
        this.loadEmptyImages();
        const uploaderOptions: FileUploaderOptions = {
        url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
        // Upload files automatically upon addition to upload queue
        autoUpload: true,
        // Use xhrTransport in favor of iframeTransport
        isHTML5: true,
        // Calculate progress independently for each uploaded file
        removeAfterUpload: true,
        // XHR request headers
        headers: [
            {
            name: 'X-Requested-With',
            value: 'XMLHttpRequest'
            }
        ]
    };

    const upsertResponse = fileItem => {
        // Check if HTTP request was successful
        if (fileItem.status !== 200) {
          console.log('Upload to cloudinary Failed');
          console.log(fileItem);
          return false;
        }
        let imageCollection = DB.getCollection('imagegallery');
        if (!imageCollection) {
          imageCollection = DB.addCollection('imagegallery');
        }
        imageCollection.insert(fileItem.data);
        const that = this;
        DB.saveDatabase(function(saveErr) {
          if (saveErr) {
            console.log('error : ' + saveErr);
          } else {
            that.loadUploadedImages();
          }
        });
    };

    this.uploader = new FileUploader(uploaderOptions);
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
        // Add Cloudinary's unsigned upload preset to the upload form
        form.append('upload_preset', this.cloudinary.config().upload_preset);
        // Add built-in and custom tags for displaying the uploaded photo in the list
        let tags = 'angularimagegallery';
        if (this.title2) {
          form.append('context', `photo=${this.title2}`);
          tags = `angularimagegallery,${this.title2}`;
        }
        form.append('tags', tags);
        form.append('file', fileItem);
        // Use default "withCredentials" value for CORS requests
        fileItem.withCredentials = false;
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) =>
        upsertResponse(
          {
            file: item.file,
            status,
            data: JSON.parse(response)
          }
        );
    }

    loadDB(): void {
      DB.loadDatabase({}, function(err) {
        if (err) {
          console.log();
        } else {
          console.log('db loaded');
        }
      });
    }

    loadUploadedImages(): void {
        const imageCollection = DB.getCollection('imagegallery');

        if (imageCollection) {
            this.imageDataArray = imageCollection.find();
            this.currentSize = this.imageDataArray.length;
            this.file_current_name = this.imageDataArray[this.imageDataArray.length - 1].public_id;
            this.updateFile = true;
        }
    }

    loadEmptyImages(): void {
        const imageCollection = DB.getCollection('imagegallery');
        if (imageCollection) {
            this.imageDataArray = imageCollection.find();
            this.startSize = this.imageDataArray.length;
            this.currentSize = this.imageDataArray.length;
        }
    }

    public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }

    get f() { return this.addPhotoForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.addPhotoForm.invalid) {
            return;
        }

        if (this.file_current_name === '' || this.updateFile === false) {
            return;
        }

        const tags: number[] = [];
        for (const tagsA of this.tagsAlphabet) {
            for (const tag of tagsA.tags) {
                if (tag.isSelect === true) {
                    tags.push(tag.tag.tag_id);
                }
            }
        }

        this.loading = true;
        this.httpService.addPhoto(this.f.title.value, this.f.description.value, this.file_current_name, tags)
            .subscribe(
                data => {
                    this.alertService.success('Zdjęcie zostało dodane', true);
                    this.router.navigate(['/strona-domowa']);
                },
                error => {
                    this.alertService.error('Dodawanie zdjęcia się niepowiodło.');
                    this.loading = false;
                });
    }

    private loadTags() {
        this.httpService.getTags().subscribe(
            data => {
                this.loadAlphabet(data);
            }
        );
    }

    private loadAlphabet(tags: Tag[]) {
        for (const char of this.ALPHABET) {
            const table: Array<TagWithSelect> = [];
            for (const tag of tags) {
                if ( char === tag.name[0].toUpperCase()) {
                    const newItem = new TagWithSelect();
                    newItem.tag = tag;
                    newItem.isSelect = false;
                    table.push(newItem);
                }
            }
            if (table.length > 0) {
                const newItem = new AlphTags();
                newItem.char = char;
                newItem.tags = table;
                this.tagsAlphabet.push(newItem);
            }
        }
    }

    toogleIsSelectTag(tag_name: string) {
        for (const tags of this.tagsAlphabet) {
            for (const tag of tags.tags) {
                if (tag.tag.name === tag_name) {
                    tag.isSelect = !tag.isSelect;
                }
            }
        }
    }
}

export class AlphTags {
    char: string;
    tags: Array<TagWithSelect>;
}

export class TagWithSelect {
    tag: Tag;
    isSelect: boolean;
}
