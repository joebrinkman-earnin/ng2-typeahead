import {
    describe,
    expect,
    it,
    inject,
    beforeEachProviders,
    beforeEach
} from 'angular2/testing';
import {Component, provide} from 'angular2/core';

import {Typeahead} from '../src/components/ng2-typeahead';


describe('Autocomplete Component', () => {

    beforeEachProviders(() => {
        return [
            Typeahead
        ];
    });

    beforeEach(() => {
    });

    it('correctly populates the typeahead element', inject([Typeahead], (typeahead) => {
        // arrange
        typeahead.input = '';
        typeahead.areSuggestionsVisible = true;
        typeahead.displayProperty = 'display';
        typeahead.suggestions = [{ code: '', name: '', dispayName: '' }];
        typeahead.activeSuggestion = { 'display': 'value' };
        // act
        typeahead.populateTypeahead();
        // assert
        expect(typeahead.typeahead).toEqual('value');
    }));

});
