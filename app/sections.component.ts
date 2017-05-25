import { Component, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// import { URLSearchParams } from '@angular/http';

interface Section {
    _id: string;
    title: string;
}

@Component({
    selector: 'sections',
    templateUrl: 'app/sections.component.html'
})
export class SectionsComponent {
    private sectionsUrl = 'sections';  // URL to web api
    sections: Section[];
    activeSection: string;

    constructor(private http: Http) { 
        this.readSections();
    }
    
    @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();

    readSections() {
        this.getSections().subscribe(sections=>{
            this.sections=sections;
            if (this.activeSection == null && this.sections.length>0) {
                this.showSection(this.sections[0]);
            }
        });
    }

    getSections(): Observable<Section[]> {
        return this.http.get(this.sectionsUrl)
                .map(response => response.json() as Section[]);
    }
    
    showSection(section:Section) {
        this.activeSection = section.title;
        this.sectionChanged.emit(this.activeSection);
    }
}