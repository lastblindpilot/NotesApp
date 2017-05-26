import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoginService } from "./services/LoginService";
// import { URLSearchParams } from '@angular/http';

export interface Section {
    _id?: string;
    title: string;
}

@Component({
    selector: 'sections',
    templateUrl: 'app/sections.component.html'
})
export class SectionsComponent {
    private sectionsUrl = 'sections';  // URL to web api
    private sectionsReplaceUrl = "/sections/replace";
    sections: Section[];
    activeSection: string;

    constructor(private http: Http, private loginService: LoginService) { 
        this.readSections();
        this.loginService.userLogin$.subscribe(user => this.readSections());
    }

    @Input()
    set section(section:string) {
        if (section && section.length>0) {
        this.activeSection = section;
        }
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

    // addSection(newSection: HTMLInputElement) {
    //     if (!.title) return;

    //     // check for duplicates
    //     if (this.sections.map(s=>s.title).find(t=>t===title)) return;

    //     const section: Section = { title };
    //     this.sections.unshift(section);
    //     this.showSection(section);

    //     // write sections to server and clear add section input box
    //     this.writeSections().subscribe(res=>newSection.value = "");
    // }

    writeSections() {
        return this.http.post(this.sectionsReplaceUrl, this.sections); 
    }
}