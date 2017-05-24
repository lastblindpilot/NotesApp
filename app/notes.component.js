"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var NotesComponent = (function () {
    function NotesComponent(http) {
        this.http = http;
        this.notesUrl = 'notes'; // URL to web api
        this.section = "Work";
        this.readNotes();
    }
    NotesComponent.prototype.readNotes = function () {
        var _this = this;
        this.getNotes().map(function (notes) {
            _this.notes = notes;
            console.log(notes);
        });
    };
    NotesComponent.prototype.addNote = function () {
        var _this = this;
        var note = { text: this.text, section: this.section };
        this.http.post(this.notesUrl, note)
            .toPromise()
            .then(function (response) {
            console.log("note sent, response", response);
            _this.readNotes();
        });
    };
    NotesComponent.prototype.remove = function (id) {
        var _this = this;
        var params = new http_2.URLSearchParams();
        params.set('id', id);
        this.http.delete(this.notesUrl, { search: params })
            .toPromise()
            .then(function (response) {
            console.log("note with id " + id + " removed, response", response);
            _this.readNotes();
        });
    };
    NotesComponent.prototype.getNotes = function () {
        var params = new http_2.URLSearchParams();
        params.set('section', this.section);
        return this.http.get(this.notesUrl, { search: params })
            .map(function (response) { return response.json(); });
        // return this.http.get(this.notesUrl)
        //         .toPromise()
        //         .then(response => response.json() as Note[]);
    };
    NotesComponent.prototype.sendToTop = function (idx) {
        var currentNote = this.notes[idx];
        console.log(currentNote);
        this.notes.splice(idx, 1);
        this.notes.splice(0, 0, currentNote);
    };
    return NotesComponent;
}());
NotesComponent = __decorate([
    core_1.Component({
        selector: 'notes',
        templateUrl: 'app/notes.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], NotesComponent);
exports.NotesComponent = NotesComponent;
//# sourceMappingURL=notes.component.js.map