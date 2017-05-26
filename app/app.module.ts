import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }   from './app.component';
import { NotesComponent } from './notes.component';
import { SectionsComponent } from './sections.component';
import { NotesEditorComponent } from './noteseditor.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ViewSectionComponent } from './view-section.component';
import { UserFormComponent } from './user-form.component';
import { NotesServerService } from './services/notes-server.service';
import { EqualToValidator } from './directives/EqualToValidator';

const appRoutes: Routes = [
  { path: '', component: NotesEditorComponent },
  { path: 'viewSection/:name', component: ViewSectionComponent },
  { path: 'register', component: UserFormComponent },
  { path: ':name', component: NotesEditorComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule, 
                  RouterModule.forRoot(appRoutes), 
                  FormsModule, 
                  HttpModule ],
  declarations: [ AppComponent, 
                  NotesComponent, 
                  SectionsComponent, 
                  NotesEditorComponent, 
                  PageNotFoundComponent, 
                  ViewSectionComponent,
                  UserFormComponent,
                  EqualToValidator ],
  bootstrap:    [ AppComponent ],
  providers:    [ NotesServerService ]
})
export class AppModule { }