import { Component, ViewEncapsulation, enableProdMode } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { Typeahead } from "./main";

// Annotation section
@Component({
	selector: 'my-app',
	templateUrl: 'app.html',
	styleUrls: ['app.css'],
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
	encapsulation: ViewEncapsulation.None
})
// Component controller
class MyAppComponent {

	constructor() {
	}

}

enableProdMode();
bootstrap(MyAppComponent);
