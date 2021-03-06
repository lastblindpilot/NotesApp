"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var notes_component_1 = require("./notes.component");
var sections_component_1 = require("./sections.component");
var noteseditor_component_1 = require("./noteseditor.component");
var page_not_found_component_1 = require("./page-not-found.component");
var view_section_component_1 = require("./view-section.component");
var user_form_component_1 = require("./user-form.component");
var notes_server_service_1 = require("./services/notes-server.service");
var EqualToValidator_1 = require("./directives/EqualToValidator");
var UserUniqueValidator_1 = require("./directives/UserUniqueValidator");
var LoginService_1 = require("./services/LoginService");
var login_form_component_1 = require("./login-form.component");
var appRoutes = [
    { path: '', component: noteseditor_component_1.NotesEditorComponent },
    { path: 'viewSection/:name', component: view_section_component_1.ViewSectionComponent },
    { path: 'register', component: user_form_component_1.UserFormComponent },
    { path: ':name', component: noteseditor_component_1.NotesEditorComponent },
    { path: '**', component: page_not_found_component_1.PageNotFoundComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(appRoutes),
            forms_1.FormsModule,
            http_1.HttpModule],
        declarations: [app_component_1.AppComponent,
            notes_component_1.NotesComponent,
            sections_component_1.SectionsComponent,
            noteseditor_component_1.NotesEditorComponent,
            page_not_found_component_1.PageNotFoundComponent,
            view_section_component_1.ViewSectionComponent,
            user_form_component_1.UserFormComponent,
            EqualToValidator_1.EqualToValidator,
            UserUniqueValidator_1.UserUniqueValidator,
            login_form_component_1.LoginFormComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [notes_server_service_1.NotesServerService, LoginService_1.LoginService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map