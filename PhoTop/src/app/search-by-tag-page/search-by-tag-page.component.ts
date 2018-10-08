import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Tag } from '../_models/tag';

@Component({
    selector: 'app-search-by-tag-page',
    templateUrl: 'search-by-tag-page.component.html',
    styleUrls: ['search-by-tag-page.component.css']
})
export class SearchByTagPageComponent implements OnInit {

    // tslint:disable-next-line:max-line-length
    ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    alphabet: String[];
    tagsAlphabet: Array<AlphTags> = [];

    tags: Tag[];

    constructor(
        private httpService: HttpService,
        private router: Router) {
    }

    ngOnInit() {
        this.loadTags();
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
            const table: Array<Tag> = [];
            for (const tag of tags) {
                if ( char === tag.name[0].toUpperCase()) {
                    table.push(tag);
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

    moreInfoAboutPhoto(tag_name: string) {
        const selectTag = new Tag();
        selectTag.name = tag_name;
        localStorage.setItem('selectTag', JSON.stringify(selectTag));
        this.router.navigateByUrl('/szukaj-wedlug-tagu-zdjec');
    }
}

export class AlphTags {
    char: string;
    tags: Array<Tag>;
}
