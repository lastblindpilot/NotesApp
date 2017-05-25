import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Note } from "../notes.component";
import { URLSearchParams } from '@angular/http';

@Injectable()
export class NotesServerService {
    private notesUrl = 'notes';  // URL to web api

    constructor(private http: Http) { }
    
    getNotes(section: string): Observable<Note[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('section', section);
    
        return this.http.get(this.notesUrl, {search:params})
                .map(response => {
                    // let notes: Note[] = response.json()
                    // console.log(notes);
                    return response.json() as Note[]
                });
    }
}