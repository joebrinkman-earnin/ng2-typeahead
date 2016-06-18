import { OnInit } from 'angular2/core';
export declare class Typeahead implements OnInit {
    /**
     * The complete list of items.
     */
    private list;
    /**
     * Input element placeholder text.
     */
    private placeholder;
    /**
     * The property of a list item that should be used for matching.
     */
    private searchProperty;
    /**
     * The property of a list item that should be displayed.
     */
    private displayProperty;
    /**
     * The maximum number of suggestions to display.
     */
    private maxSuggestions;
    /**
     * Event that occurs when a suggestion is selected.
     */
    private suggestionSelected;
    /**
     * Handle to the input element.
     */
    private inputElement;
    /**
     * The input element's value.
     */
    private input;
    /**
     * The typeahead element's value. This element is displayed behind the input element.
     */
    private typeahead;
    /**
     * The previously entered input string.
     */
    private previousInput;
    /**
     * The filtered list of suggestions.
     */
    private suggestions;
    /**
     * Indicates whether the suggestions are visible.
     */
    private areSuggestionsVisible;
    /**
     * The currently selected suggestion.
     */
    private selectedSuggestion;
    /**
     * The active (highlighted) suggestion.
     */
    private activeSuggestion;
    /**
     * Creates and initializes a new autocomplete component.
     */
    constructor();
    /**
     * Implement this interface to execute custom initialization logic after your
     * directive's data-bound properties have been initialized.
     *
     * ngOnInit is called right after the directive's data-bound properties have
     * been checked for the first time, and before any of its
     * children have been checked. It is invoked only once when the directive is
     * instantiated.
     */
    ngOnInit(): void;
    /**
     * Called when a keydown event is fired on the input element.
     */
    inputKeyDown(event: KeyboardEvent): void;
    /**
     * Sets the active (highlighted) suggestion.
     */
    setActiveSuggestion(suggestion: any): void;
    /**
     * Gets the index of the active suggestion within the suggestions list.
     */
    getActiveSuggestionIndex(): number;
    /**
     * Gets the index of an object in a list by matching a property value.
     */
    indexOfObject(array: any[], property: string, value: string): number;
    /**
     * Called when a keyup event is fired on the input element.
     */
    inputKeyUp(event: KeyboardEvent): void;
    /**
     * Called when a focus event is fired on the input element.
     */
    inputFocus(event: FocusEvent): void;
    /**
     * Called when a blur event is fired on the input element.
     */
    inputBlur(event: Event): void;
    /**
     * Called when a mouseover event is fired on a suggestion element.
     */
    suggestionMouseOver(suggestion: any): void;
    /**
     * Called when a mousedown event is fired on a suggestion element.
     */
    suggestionMouseDown(suggestion: any): void;
    /**
     * Called when a mouseout event is fired on the suggestions element.
     */
    suggestionsMouseOut(event: MouseEvent): void;
    /**
     * Fills the suggestions list with items matching the input pattern.
     */
    populateSuggestions(): void;
    /**
     * Sets the typeahead input element's value based on the active suggestion.
     */
    populateTypeahead(): void;
    /**
     * Selects a suggestion.
     */
    selectSuggestion(suggestion: any): void;
    /**
     * Blurs the input element in order to "lock" the value and prevent partial editing.
     */
    blurInputElement(): void;
    /**
     * Indicates whether a suggestion has been selected.
     */
    hasSelection(): boolean;
}
