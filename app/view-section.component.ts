import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Note } from "./notes.component";
import { NotesServerService } from "./services/notes-server.service";

@Component({
    selector: 'view-section',
    templateUrl: 'app/view-section.component.html'
})
export class ViewSectionComponent {
    section: string;
    notes: Note[];

    constructor(private route: ActivatedRoute, private noteServer: NotesServerService) {}
    
    ngOnInit() {
        this.section = this.route.snapshot.params["name"];
        this.getNotes().subscribe(notes=>this.notes=notes);
    }
    
    getNotes() {
        return this.noteServer.getNotes(this.section);
    }
}