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
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var noop = function () {
};
exports.TYPEAHEAD_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Typeahead; }),
    multi: true
};
var Typeahead = (function () {
    /**
     * Creates and initializes a new typeahead component.
     */
    function Typeahead() {
        /**
         * The complete list of items.
         */
        this.list = [];
        /**
         * Input element placeholder text.
         */
        this.placeholder = '';
        /**
         * The property of a list item that should be used for matching.
         */
        this.searchProperty = 'name';
        /**
         * The property of a list item that should be displayed.
         */
        this.displayProperty = 'name';
        /**
         * The maximum number of suggestions to display.
         */
        this.maxSuggestions = -1;
        /**
         * Event that occurs when a suggestion is selected.
         */
        this.suggestionSelected = new core_1.EventEmitter();
        /**
         * The filtered list of suggestions.
         */
        this.suggestions = [];
        /**
         * Indicates whether the suggestions are visible.
         */
        this.areSuggestionsVisible = false;
        /**
         * Indicates whether the control is disabled.
         */
        this.isDisabled = false;
        /**
         * Placeholder for a callback which is later provided by the Control Value Accessor.
         */
        this.onTouchedCallback = noop;
        /**
         * Placeholder for a callback which is later provided by the Control Value Accessor.
         */
        this.onChangeCallback = noop;
    }
    /**
     * Implement this interface to execute custom initialization logic after your
     * directive's data-bound properties have been initialized.
     *
     * ngOnInit is called right after the directive's data-bound properties have
     * been checked for the first time, and before any of its
     * children have been checked. It is invoked only once when the directive is
     * instantiated.
     */
    Typeahead.prototype.ngOnInit = function () {
    };
    Object.defineProperty(Typeahead.prototype, "value", {
        /**
         * Get accessor.
         */
        get: function () {
            return this.selectedSuggestion;
        },
        /**
         * Set accessor including call the onchange callback.
         */
        set: function (v) {
            if (v !== this.selectedSuggestion) {
                this.selectSuggestion(v);
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * From ControlValueAccessor interface.
     */
    Typeahead.prototype.writeValue = function (value) {
        if (value !== this.selectedSuggestion) {
            this.selectSuggestion(value);
        }
    };
    /**
     * From ControlValueAccessor interface.
     */
    Typeahead.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * From ControlValueAccessor interface.
     */
    Typeahead.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * Sets the disabled state of the control.
     * @param isDisabled
     */
    Typeahead.prototype.setDisabledState = function (isDisabled) {
        this.isDisabled = isDisabled;
    };
    /**
     * Called when a keydown event is fired on the input element.
     */
    Typeahead.prototype.inputKeyDown = function (event) {
        if (event.which === 9 || event.keyCode === 9) {
            // Only enter this branch if suggestions are displayed
            if (!this.areSuggestionsVisible) {
                return;
            }
            // Select the first suggestion
            this.selectSuggestion(this.activeSuggestion);
            // Remove all but the first suggestion
            this.suggestions.splice(1);
            // Hide the suggestions
            this.areSuggestionsVisible = false;
            event.preventDefault();
        }
        else if (event.which === 38 || event.keyCode === 38) {
            // Find the active suggestion in the list
            var activeSuggestionIndex = this.getActiveSuggestionIndex();
            // If not found, then activate the first suggestion
            if (activeSuggestionIndex === -1) {
                this.setActiveSuggestion(this.suggestions[0]);
                return;
            }
            if (activeSuggestionIndex === 0) {
                // Go to the last suggestion
                this.setActiveSuggestion(this.suggestions[this.suggestions.length - 1]);
            }
            else {
                // Decrement the suggestion index
                this.setActiveSuggestion(this.suggestions[activeSuggestionIndex - 1]);
            }
        }
        else if (event.which === 40 || event.keyCode === 40) {
            // Find the active suggestion in the list
            var activeSuggestionIndex = this.getActiveSuggestionIndex();
            // If not found, then activate the first suggestion
            if (activeSuggestionIndex === -1) {
                this.setActiveSuggestion(this.suggestions[0]);
                return;
            }
            if (activeSuggestionIndex === (this.suggestions.length - 1)) {
                // Go to the first suggestion
                this.setActiveSuggestion(this.suggestions[0]);
            }
            else {
                // Increment the suggestion index
                this.setActiveSuggestion(this.suggestions[activeSuggestionIndex + 1]);
            }
        }
        else if ((event.which === 10 || event.which === 13 ||
            event.keyCode === 10 || event.keyCode === 13) &&
            this.areSuggestionsVisible) {
            // Select the active suggestion
            this.selectSuggestion(this.activeSuggestion);
            // Hide the suggestions
            this.areSuggestionsVisible = false;
            event.preventDefault();
        }
    };
    /**
     * Sets the active (highlighted) suggestion.
     */
    Typeahead.prototype.setActiveSuggestion = function (suggestion) {
        this.activeSuggestion = suggestion;
        this.populateTypeahead();
    };
    /**
     * Gets the index of the active suggestion within the suggestions list.
     */
    Typeahead.prototype.getActiveSuggestionIndex = function () {
        var activeSuggestionIndex = -1;
        if (this.activeSuggestion != null) {
            activeSuggestionIndex = this.indexOfObject(this.suggestions, this.searchProperty, this.activeSuggestion[this.searchProperty]);
        }
        return activeSuggestionIndex;
    };
    /**
     * Gets the index of an object in a list by matching a property value.
     */
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
    /**
     * Called when a keyup event is fired on the input element.
     */
    Typeahead.prototype.inputKeyUp = function (event) {
        // Ignore TAB, UP, and DOWN since they are processed by the keydown handler
        if (event.which === 9 || event.keyCode === 9 ||
            event.which === 38 || event.keyCode === 38 ||
            event.which === 40 || event.keyCode === 40) {
            return;
        }
        // When the input is cleared
        if (this.input == null || this.input.length === 0) {
            console.debug("When the input is cleared");
            this.typeahead = '';
            this.populateSuggestions();
            return;
        }
        // If the suggestion matches the input, then return
        if (this.selectedSuggestion != null) {
            console.debug("If the suggestion matches the input, then return");
            if (this.selectedSuggestion[this.displayProperty] === this.input) {
                return;
            }
        }
        // Repopulate the suggestions
        this.previousInput = this.input;
        this.populateSuggestions();
        this.populateTypeahead();
    };
    /**
     * Called when a focus event is fired on the input element.
     */
    Typeahead.prototype.inputFocus = function (event) {
        // If the element is receiving focus and it has a selection, then
        // clear the selection. This helps prevent partial editing
        if (this.selectedSuggestion != null) {
            this.selectSuggestion(null);
            this.input = null;
            this.populateTypeahead();
        }
        // Re-populate the suggestions
        this.populateSuggestions();
        // If we have suggestions
        if (this.suggestions.length > 0) {
            // Set the typeahead to a slice of the first suggestion
            this.populateTypeahead();
            // Show/hide the suggestions
            this.areSuggestionsVisible = this.suggestions.length > 0;
        }
    };
    /**
     * Called when a blur event is fired on the input element.
     */
    Typeahead.prototype.inputBlur = function (event) {
        this.typeahead = '';
        this.areSuggestionsVisible = false;
        this.onTouchedCallback();
    };
    /**
     * Called when a mouseover event is fired on a suggestion element.
     */
    Typeahead.prototype.suggestionMouseOver = function (suggestion) {
        this.setActiveSuggestion(suggestion);
    };
    /**
     * Called when a mousedown event is fired on a suggestion element.
     */
    Typeahead.prototype.suggestionMouseDown = function (suggestion) {
        this.selectSuggestion(suggestion);
    };
    /**
     * Called when a mouseout event is fired on the suggestions element.
     */
    Typeahead.prototype.suggestionsMouseOut = function (event) {
        this.setActiveSuggestion(null);
    };
    /**
     * Fills the suggestions list with items matching the input pattern.
     */
    Typeahead.prototype.populateSuggestions = function () {
        // Capture variables scoped to the component
        var searchProperty = this.searchProperty;
        var input = this.input;
        // Confirm that we have a search property
        if (searchProperty == null || searchProperty.length === 0) {
            console.error('The input attribute `searchProperty` must be provided');
            return;
        }
        // Handle empty input
        if (input == null || input.length === 0) {
            // No input yet
            this.suggestions = [];
            this.areSuggestionsVisible = false;
            return;
        }
        // Check that we have data
        if (this.list == null || this.list.length === 0)
            return;
        // Filter the suggestions
        this.suggestions = this.list.filter(function (item) {
            return item[searchProperty].toLowerCase().indexOf(input.toLowerCase()) > -1;
        });
        // Limit the suggestions (if applicable)
        if (this.maxSuggestions > -1) {
            this.suggestions = this.suggestions.slice(0, this.maxSuggestions);
        }
        if (this.suggestions.length === 0) {
            // No suggestions, so clear the typeahead
            this.typeahead = '';
        }
        else {
            // Set the typeahead value
            this.populateTypeahead();
            // Make the first suggestion active
            this.activeSuggestion = this.suggestions[0];
        }
        // Show/hide the suggestions
        this.areSuggestionsVisible = this.suggestions.length > 0;
    };
    /**
     * Sets the typeahead input element's value based on the active suggestion.
     */
    Typeahead.prototype.populateTypeahead = function () {
        // Clear the typeahead when there is no active suggestion
        if (this.activeSuggestion == null || !this.areSuggestionsVisible) {
            this.typeahead = '';
            return;
        }
        // Set the typeahead value
        this.typeahead = this.input + (this.activeSuggestion[this.displayProperty] || '').slice(this.input.length);
    };
    /**
     * Selects a suggestion.
     */
    Typeahead.prototype.selectSuggestion = function (suggestion) {
        // Set the variable
        this.selectedSuggestion = suggestion;
        // Hide the suggestions
        this.areSuggestionsVisible = false;
        // Notify the parent component
        this.suggestionSelected.emit(suggestion);
        // Other form operations
        if (this.selectedSuggestion != null) {
            // Set the values of the input elements
            this.input = suggestion[this.displayProperty];
            this.typeahead = suggestion[this.displayProperty];
            // Blur the input so we can "lock" the selected suggestion
            this.blurInputElement();
        }
    };
    /**
     * Blurs the input element in order to "lock" the value and prevent partial editing.
     */
    Typeahead.prototype.blurInputElement = function () {
        if (this.inputElement && this.inputElement.nativeElement) {
            this.inputElement.nativeElement.blur();
        }
    };
    /**
     * Indicates whether a suggestion has been selected.
     */
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
            template: "\n    <div class=\"typeahead\">\n\n      <input #inputElement\n        [placeholder]=\"placeholder\"\n        [(ngModel)]=\"input\"\n        type=\"text\"\n        [ngClass]=\"{'typeahead-input': true, 'typeahead-input-has-selection': hasSelection()}\"\n        typeahead=\"off\"\n        spellcheck=\"false\"\n        (keyup)=\"inputKeyUp($event)\"\n        (keydown)=\"inputKeyDown($event)\"\n        (focus)=\"inputFocus($event)\"\n        (blur)=\"inputBlur($event)\"\n        [disabled]=\"isDisabled\">\n\n      <input type=\"text\"\n        class=\"typeahead-typeahead\"\n        [(ngModel)]=\"typeahead\"\n        typeahead=\"off\"\n        spellcheck=\"false\"\n        disabled=\"true\">\n\n      <div #suggestionsContainer\n        class=\"typeahead-suggestions\"\n        [hidden]=\"!areSuggestionsVisible\">\n\n        <ul (mouseout)=\"suggestionsMouseOut($event)\">\n\n          <li *ngFor=\"let suggestion of suggestions\"\n            (mouseover)=\"suggestionMouseOver(suggestion)\"\n            (mousedown)=\"suggestionMouseDown(suggestion)\"\n            [ngClass]=\"{'typeahead-suggestion-active': activeSuggestion===suggestion}\">{{ suggestion[displayProperty] }}</li>\n\n        </ul>\n\n      </div>\n\n    </div>\n    ",
            styles: ["\n    .typeahead {\n      position: relative;\n      width: 100%;\n      text-align: left;\n      vertical-align: top;\n      padding-bottom: 2.5em;\n    }\n\n    .typeahead-input {\n      border-color: transparent;\n      position: absolute;\n      z-index: 10;\n      background-color: transparent;\n      background-repeat: no-repeat;\n      background-position: right 10px;\n      background-size: 28px 18px;\n    }\n\n    .typeahead-input-has-selection {\n      background-color: #f5f5f5;\n      border: 1px solid #4c4845;\n      color: #008fca;\n    }\n\n    .typeahead-typeahead {\n      color: rgb(128, 128, 128);\n      position: absolute;\n      z-index: 5;\n      text-align: start;\n      background-color: rgb(255, 255, 255);\n    }\n\n    .typeahead-suggestions {\n      position: absolute;\n      top: 42px;\n      overflow-y: auto;\n      color: #666666;\n      border-radius: 3px;\n      padding: 0;\n      background-color: #f5f5f5;\n      width: 100%;\n      max-height: 18em !important;\n      border: 1px solid #e0e0e0;\n      z-index: 100;\n    }\n\n    .typeahead-suggestions ul {\n      list-style-type: none;\n      padding-left: 0;\n      margin-top: 3px;\n    }\n\n    .typeahead-suggestions ul li {\n      padding: 6px !important;\n      font-size: 0.9em;\n      border-bottom: 1px solid #e0e0e0;\n    }\n\n    .typeahead-suggestion-active {\n      background-color: #008fca;\n      color: #ffffff;\n    }\n    "],
            providers: [exports.TYPEAHEAD_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], Typeahead);
    return Typeahead;
}());
exports.Typeahead = Typeahead;
//# sourceMappingURL=ng2-typeahead.js.map