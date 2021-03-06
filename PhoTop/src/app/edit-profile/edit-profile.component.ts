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

@Component({
    selector: 'app-edit-profile',
    templateUrl: 'edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditPrifileComponent implements OnInit {

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

    updateFile = false;

    user: User2;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private httpService: HttpService,
        private alertService: AlertService,
        private cloudinary: Cloudinary) {
            this.title2 = '';
    }

    ngOnInit() {

        this.addPhotoForm = this.formBuilder.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            description: ['']
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

        this.loadUserData();
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
            console.log(this.imageDataArray);
            console.log(this.startSize, this.currentSize, this.imageDataArray.length, this.file_current_name );
        }
    }

    loadEmptyImages(): void {
        const imageCollection = DB.getCollection('imagegallery');
        if (imageCollection) {
            this.imageDataArray = imageCollection.find();
            this.startSize = this.imageDataArray.length;
            this.currentSize = this.imageDataArray.length;
            console.log(this.startSize, this.currentSize, this.imageDataArray.length, this.file_current_name );
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

        this.loading = true;
        this.httpService.editUserData(this.f.name.value, this.f.surname.value, this.f.description.value, this.file_current_name)
            .subscribe(
                data => {
                    this.alertService.success('Edycja powiodła się', true);
                    this.router.navigate(['/strona-domowa']);
                },
                error => {
                    this.alertService.error('Edycja profilu nie powiodła się.');
                    this.loading = false;
                });
    }

    private loadUserData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.httpService.getUser(currentUser.user_id).subscribe(data => {
            console.log(data);
            if (!data.avatar) {
                data.avatar = 'default_avatar';
            }
            this.user = data;

            this.addPhotoForm = this.formBuilder.group({
                name: [this.user.name, Validators.required],
                surname: [this.user.surname, Validators.required],
                description: [this.user.description]
            });
        });
    }
}
