import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

interface Note {
    _id: number;
    text: string;
    section?: string;
}

@Component({
    selector: 'notes',
    templateUrl: 'app/notes.component.html'
})
export class NotesComponent implements OnChanges {
    private notesUrl = 'notes';  // URL to web api
    text: string;
    notes: Note[];
    @Input() 
    section: string;

    constructor(private http: Http) { }

    ngOnChanges(): void {
        this.readNotes();
    }

    readNotes(): void {
        this.getNotes().map(notes=>{
            this.notes=notes
            console.log(notes);
        });
    }

    addNote() {
        let note = { text: this.text, section: this.section };
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

    getNotes(): Observable<Note[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('section', this.section);
    
        return this.http.get(this.notesUrl, {search:params})
                .map(response => {
                    // let notes: Note[] = response.json()
                    // console.log(notes);
                    return response.json() as Note[]
                });
    }

    sendToTop(idx: number): void {
        let currentNote = this.notes[idx];
        console.log(currentNote);
        this.notes.splice(idx,1);
        this.notes.splice(0,0,currentNote);
    }
}