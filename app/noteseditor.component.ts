import { Component } from '@angular/core';

@Component({
    selector: 'notes-editor',
    templateUrl: 'app/noteseditor.component.html'
})
export class NotesEditorComponent {
    section: string;
    
    setSection(section:string) {
        this.section = section;
    }
}