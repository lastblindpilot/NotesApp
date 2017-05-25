import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'notes-editor',
    templateUrl: 'app/noteseditor.component.html'
})
export class NotesEditorComponent {
    section: string;

    constructor(private route: ActivatedRoute, private router: Router) {}

    setSection(section:string) {
        this.section = section;
    }
}