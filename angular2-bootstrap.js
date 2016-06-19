webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(177);


/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

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
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(72);
	var Typeahead = (function () {
	    function Typeahead() {
	        this.list = [];
	        this.placeholder = '';
	        this.searchProperty = 'name';
	        this.displayProperty = 'name';
	        this.maxSuggestions = -1;
	        this.suggestionSelected = new core_1.EventEmitter();
	        this.suggestions = [];
	        this.areSuggestionsVisible = false;
	    }
	    Typeahead.prototype.ngOnInit = function () {
	    };
	    Typeahead.prototype.inputKeyDown = function (event) {
	        if (event.which === 9 || event.keyCode === 9) {
	            if (!this.areSuggestionsVisible) {
	                return;
	            }
	            this.selectSuggestion(this.activeSuggestion);
	            this.suggestions.splice(1);
	            this.areSuggestionsVisible = false;
	            event.preventDefault();
	        }
	        else if (event.which === 38 || event.keyCode === 38) {
	            var activeSuggestionIndex = this.getActiveSuggestionIndex();
	            if (activeSuggestionIndex === -1) {
	                this.setActiveSuggestion(this.suggestions[0]);
	                return;
	            }
	            if (activeSuggestionIndex === 0) {
	                this.setActiveSuggestion(this.suggestions[this.suggestions.length - 1]);
	            }
	            else {
	                this.setActiveSuggestion(this.suggestions[activeSuggestionIndex - 1]);
	            }
	        }
	        else if (event.which === 40 || event.keyCode === 40) {
	            var activeSuggestionIndex = this.getActiveSuggestionIndex();
	            if (activeSuggestionIndex === -1) {
	                this.setActiveSuggestion(this.suggestions[0]);
	                return;
	            }
	            if (activeSuggestionIndex === (this.suggestions.length - 1)) {
	                this.setActiveSuggestion(this.suggestions[0]);
	            }
	            else {
	                this.setActiveSuggestion(this.suggestions[activeSuggestionIndex + 1]);
	            }
	        }
	        else if ((event.which === 10 || event.which === 13 ||
	            event.keyCode === 10 || event.keyCode === 13) &&
	            this.areSuggestionsVisible) {
	            this.selectSuggestion(this.activeSuggestion);
	            this.areSuggestionsVisible = false;
	            event.preventDefault();
	        }
	    };
	    Typeahead.prototype.setActiveSuggestion = function (suggestion) {
	        this.activeSuggestion = suggestion;
	        this.populateTypeahead();
	    };
	    Typeahead.prototype.getActiveSuggestionIndex = function () {
	        var activeSuggestionIndex = -1;
	        if (this.activeSuggestion != null) {
	            activeSuggestionIndex = this.indexOfObject(this.suggestions, this.searchProperty, this.activeSuggestion[this.searchProperty]);
	        }
	        return activeSuggestionIndex;
	    };
	    Typeahead.prototype.indexOfObject = function (array, property, value) {
	        if (array == null || array.length === 0)
	            return -1;
	        var index = -1;
	        for (var i = 0; i < array.length; i++) {
	            if (array[i][property] != null && array[i][property] === value) {
	                index = i;
	            }
	        }
	        return index;
	    };
	    Typeahead.prototype.inputKeyUp = function (event) {
	        if (event.which === 9 || event.keyCode === 9 ||
	            event.which === 38 || event.keyCode === 38 ||
	            event.which === 40 || event.keyCode === 40) {
	            return;
	        }
	        if (this.input == null || this.input.length === 0) {
	            this.typeahead = '';
	            this.populateSuggestions();
	            return;
	        }
	        if (this.selectedSuggestion != null) {
	            if (this.selectedSuggestion[this.displayProperty] === this.input) {
	                return;
	            }
	        }
	        if (this.input !== this.previousInput) {
	            this.previousInput = this.input;
	            this.populateSuggestions();
	            this.populateTypeahead();
	        }
	    };
	    Typeahead.prototype.inputFocus = function (event) {
	        if (this.selectedSuggestion != null) {
	            this.selectSuggestion(null);
	            this.input = null;
	            this.populateTypeahead();
	        }
	        this.populateSuggestions();
	        if (this.suggestions.length > 0) {
	            this.populateTypeahead();
	            this.areSuggestionsVisible = this.suggestions.length > 0;
	        }
	    };
	    Typeahead.prototype.inputBlur = function (event) {
	        this.typeahead = '';
	        this.areSuggestionsVisible = false;
	    };
	    Typeahead.prototype.suggestionMouseOver = function (suggestion) {
	        this.setActiveSuggestion(suggestion);
	    };
	    Typeahead.prototype.suggestionMouseDown = function (suggestion) {
	        this.selectSuggestion(suggestion);
	    };
	    Typeahead.prototype.suggestionsMouseOut = function (event) {
	        this.setActiveSuggestion(null);
	    };
	    Typeahead.prototype.populateSuggestions = function () {
	        var searchProperty = this.searchProperty;
	        var input = this.input;
	        if (searchProperty == null || searchProperty.length === 0) {
	            console.error('The input attribute `searchProperty` must be provided');
	            return;
	        }
	        if (input == null || input.length === 0) {
	            this.suggestions = [];
	            this.areSuggestionsVisible = false;
	            return;
	        }
	        if (this.list == null || this.list.length === 0)
	            return;
	        this.suggestions = this.list.filter(function (item) {
	            return item[searchProperty].toLowerCase().indexOf(input.toLowerCase()) > -1;
	        });
	        if (this.maxSuggestions > -1) {
	            this.suggestions = this.suggestions.slice(0, this.maxSuggestions);
	        }
	        if (this.suggestions.length === 0) {
	            this.typeahead = '';
	        }
	        else {
	            this.populateTypeahead();
	            this.activeSuggestion = this.suggestions[0];
	        }
	        this.areSuggestionsVisible = this.suggestions.length > 0;
	    };
	    Typeahead.prototype.populateTypeahead = function () {
	        if (this.activeSuggestion == null || !this.areSuggestionsVisible) {
	            this.typeahead = '';
	            return;
	        }
	        this.typeahead = this.input + (this.activeSuggestion[this.displayProperty] || '').slice(this.input.length);
	    };
	    Typeahead.prototype.selectSuggestion = function (suggestion) {
	        this.selectedSuggestion = suggestion;
	        this.areSuggestionsVisible = false;
	        this.suggestionSelected.emit(suggestion);
	        if (this.selectedSuggestion != null) {
	            this.input = suggestion[this.displayProperty];
	            this.typeahead = suggestion[this.displayProperty];
	            this.blurInputElement();
	        }
	    };
	    Typeahead.prototype.blurInputElement = function () {
	        if (this.inputElement && this.inputElement.nativeElement) {
	            this.inputElement.nativeElement.blur();
	        }
	    };
	    Typeahead.prototype.hasSelection = function () {
	        return this.selectedSuggestion != null;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], Typeahead.prototype, "list", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Typeahead.prototype, "placeholder", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Typeahead.prototype, "searchProperty", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Typeahead.prototype, "displayProperty", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Typeahead.prototype, "maxSuggestions", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', Object)
	    ], Typeahead.prototype, "suggestionSelected", void 0);
	    __decorate([
	        core_1.ViewChild('inputElement'), 
	        __metadata('design:type', Object)
	    ], Typeahead.prototype, "inputElement", void 0);
	    Typeahead = __decorate([
	        core_1.Component({
	            selector: 'typeahead',
	            template: "\n    <div class=\"typeahead\">\n\n      <input #inputElement\n        [placeholder]=\"placeholder\"\n        [(ngModel)]=\"input\"\n        type=\"text\"\n        [ngClass]=\"{'typeahead-input': true, 'typeahead-input-has-selection': hasSelection()}\"\n        typeahead=\"off\"\n        spellcheck=\"false\"\n        (keyup)=\"inputKeyUp($event)\"\n        (keydown)=\"inputKeyDown($event)\"\n        (focus)=\"inputFocus($event)\"\n        (blur)=\"inputBlur($event)\">\n\n      <input type=\"text\"\n        class=\"typeahead-typeahead\"\n        [(ngModel)]=\"typeahead\"\n        typeahead=\"off\"\n        spellcheck=\"false\"\n        disabled=\"true\">\n\n      <div #suggestionsContainer\n        class=\"typeahead-suggestions\"\n        [hidden]=\"!areSuggestionsVisible\">\n\n        <ul (mouseout)=\"suggestionsMouseOut($event)\">\n\n          <li *ngFor=\"#suggestion of suggestions\"\n            (mouseover)=\"suggestionMouseOver(suggestion)\"\n            (mousedown)=\"suggestionMouseDown(suggestion)\"\n            [ngClass]=\"{'typeahead-suggestion-active': activeSuggestion===suggestion}\">{{ suggestion[displayProperty] }}</li>\n\n        </ul>\n\n      </div>\n\n    </div>\n    ",
	            styles: ["\n    .typeahead {\n      position: relative;\n      width: 100%;\n      text-align: left;\n      vertical-align: top;\n      padding-bottom: 2.5em;\n    }\n\n    .typeahead-input {\n      border-color: transparent;\n      position: absolute;\n      z-index: 10;\n      background-color: transparent;\n      background-repeat: no-repeat;\n      background-position: right 10px;\n      background-size: 28px 18px;\n    }\n\n    .typeahead-input-has-selection {\n      background-color: #f5f5f5;\n      border: 1px solid #4c4845;\n      color: #008fca;\n    }\n\n    .typeahead-typeahead {\n      color: rgb(128, 128, 128);\n      position: absolute;\n      z-index: 5;\n      text-align: start;\n      background-color: rgb(255, 255, 255);\n    }\n\n    .typeahead-suggestions {\n      position: absolute;\n      top: 42px;\n      overflow-y: auto;\n      color: #666666;\n      border-radius: 3px;\n      padding: 0;\n      background-color: #f5f5f5;\n      width: 100%;\n      max-height: 18em !important;\n      border: 1px solid #e0e0e0;\n      z-index: 100;\n    }\n\n    .typeahead-suggestions ul {\n      list-style-type: none;\n      padding-left: 0;\n      margin-top: 3px;\n    }\n\n    .typeahead-suggestions ul li {\n      padding: 6px !important;\n      font-size: 0.9em;\n      border-bottom: 1px solid #e0e0e0;\n    }\n\n    .typeahead-suggestion-active {\n      background-color: #008fca;\n      color: #ffffff;\n    }\n\n    .typeahead-active-suggestion {\n      background-color: #008fca !important;\n    }\n    "],
	            directives: common_1.FORM_DIRECTIVES.concat(common_1.COMMON_DIRECTIVES, common_1.CORE_DIRECTIVES),
	            providers: []
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Typeahead);
	    return Typeahead;
	}());
	exports.Typeahead = Typeahead;


/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(176));


/***/ }

});
//# sourceMappingURL=angular2-bootstrap.js.map