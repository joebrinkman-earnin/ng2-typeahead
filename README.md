# ng2-typeahead
Autocomplete component for Angular 2

***ng2-typeahead*** is an typeahead/autocomplete component for Angular2. Provide a list of objects that can be selected and specify the display and search properties. Handle the suggestion-selected event to get the selected item.

## Installation:

This component is compatible with `angular-cli` and it's recommended way to use it in conjunction with it.
Note that you **must** use `angular-cli` current master as `npm` package is outdated.

### Installation procedure:
````shell
git clone https://github.com/angular/angular-cli.git
cd angular-cli
npm install
npm link
````
````shell
ng new your-project-name
cd your-project-name
npm link angular-cli
ng install ng2-typeahead
````

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

This project is licensed under the GNU license. See the [LICENSE](LICENSE) file for more info.
