import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface Note {
    _id: number;
    text: string;
}

@Component({
    selector: 'notes',
    templateUrl: 'app/notes.component.html'
})
export class NotesComponent {
    private notesUrl = 'notes';  // URL to web api
    text: string;
    notes: Note[];

    constructor(private http: Http) { 
        this.readNotes();
    }

    readNotes() {
        this.getNotes().then(notes=>{
            this.notes=notes
            console.log(notes);
        });
    }

    addNote() {
        let note = { text: this.text }
        this.http.post(this.notesUrl, note)
            .toPromise()
            .then(response => {
                console.log("note sent, response", response);
                this.readNotes();
            });
    }

    remove(id:string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, { search: params })
            .toPromise()
            .then(response => {
                console.log(`note with id ${id} removed, response`, response);
                this.readNotes();
            });
    }

    getNotes(): Promise<Note[]> {
        return this.http.get(this.notesUrl)
                .toPromise()
                .then(response => response.json() as Note[]);
    }

    sendToTop(idx: number): void {
        let currentNote = this.notes[idx];
        console.log(currentNote);
        this.notes.splice(idx,1);
        this.notes.splice(0,0,currentNote);
    }
}