[![GitHub version](http://img.shields.io/github/release/brinkmanjg%2Fng2-typeahead.svg)](https://github.com/brinkmanjg/ng2-typeahead)
[![npm version](http://img.shields.io/npm/v/angular2-grid.svg)](https://www.npmjs.com/package/angular2-grid)
[![license](http://img.shields.io/github/license/brinkmanjg%2Fng2-typeahead.svg)](https://github.com/brinkmanjg/ng2-typeahead/blob/master/LICENSE)
[![open issues](http://img.shields.io/github/issues/brinkmanjg%2Fng2-typeahead.svg)](https://github.com/brinkmanjg/ng2-typeahead/issues)

# Angular 2 Typeahead
Angular 2 Typeahead is a typeahead/autocomplete component for [Angular 2](http://angular.io).
The demo included in this repo follows the [Angular 2 quick start](https://angular.io/docs/js/latest/quickstart.html)

#### Setup
----------

To use Angular 2 Typeahead, simply run `npm install ng2-typeahead` and then include Typeahead in your project (see Example for more details).

If you want to help with development or try the demo, it's less simple, but not hard. First you'll need to install [Node](http://nodejs.org) and check out a copy of the repo. Then run:

```shell
$ npm install
$ gulp build
```

This will give you a fully compiled version of the demo that you can run using the HTTP server of your choice.

You can also use `gulp watch` to compile the demo and have gulp watch for any changes.

NOTE: By default Angular 2 and System.js are not listed as actual dependencies, but as peer dependencies, so that npm doesn't install them on systems that just require the install file. If they are not installed, this could cause gulp to break. To fix this, run `npm install angular2 systemjs` and rerun the build command.

## Use Example:

```ts
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Typeahead} from 'ng2-typeahead';

@Component({
  template: `
  <autocomplete
    [list]="allItems"
    [search-property]="'displayName'" [display-property]="'displayName'"
    [max-suggestions]="8"
    (suggestion-selected)="itemSelected($event)" placeholder="Enter a fruit">
  </autocomplete>
  `,
  directives: [Typeahead, FORM_DIRECTIVES]
})
class App {
  allItems: any[];
  selectedItem: any;

  constructor() {
    this.allItems = [{
      "id": 1,
      "displayName": "Apple"
    },
    {
      "id": 2,
      "displayName": "Orange"
    },
    {
      "id": 3,
      "displayName": "Banana"
    }];
  }

  public itemSelected(item) {
    this.selectedItem = item;
  }

}
```

## Author

[Joe Brinkman](https://github.com/brinkmanjg)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
