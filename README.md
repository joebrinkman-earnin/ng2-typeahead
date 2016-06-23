# ng2-typeahead [![npm version](https://badge.fury.io/js/ng2-typeahead.svg)](http://badge.fury.io/js/ng2-typeahead)
Easy to use Angular2 directive for typeahead/autocomplete ([ng2-typeahead](https://github.com/brinkmanjg/ng2-typeahead))

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Join the chat at https://gitter.im/brinkmanjg/ng2-bootstrap](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/brinkmanjg/ng2-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Dependency Status](https://david-dm.org/brinkmanjg/ng2-typeahead.svg)](https://david-dm.org/brinkmanjg/ng2-typeahead)
[![devDependency Status](https://david-dm.org/brinkmanjg/ng2-typeahead/dev-status.svg)](https://david-dm.org/brinkmanjg/ng2-typeahead#info=devDependencies)
[![Throughput Graph](https://graphs.waffle.io/brinkmanjg/ng2-typeahead/throughput.svg)](https://waffle.io/brinkmanjg/ng2-typeahead/metrics)

## Quick start

1. A recommended way to install ***ng2-typeahead*** is through [npm](https://www.npmjs.com/search?q=ng2-typeahead) package manager using the following command:

  `npm i ng2-typeahead --save`

  Alternatively, you can [download it in a ZIP file](https://github.com/brinkmanjg/ng2-typeahead/archive/master.zip).

2. Currently `ng2-typeahead` contains one directive: `typeahead`.

## API for `typeahead`

### Properties

  Parameters that supported by this object:

  1. `list` - The complete list of items. These can be any type of object.
  2. `displayProperty` - The property of a list item that should be displayed.
  3. `searchProperty` - The property of a list item that should be used for matching.
  4. `maxSuggestions` - The maximum number of suggestions to display.

`displayProperty` and `searchProperty` can be the same property or different properties based on your needs.  

### Events

  - `suggestionSelected` - Called when a suggestion has been selected. The function parameter is the selected item.

### Example

```ts
import {Typeahead} from 'ng2-typeahead'

@Component({
    selector: 'my-component',
    template: require('./my.component.html'),
    directives: [Typeahead],
    providers: []
})
export class MyComponent implements OnInit {

  items: any[] = [
    {
      id: 1,
      name: "1 - Apple",
      searchText: "apple"
    },
    {
      id: 2,
      name: "2 - Orange",
      searchText: "orange"
    },
    {
      id: 3,
      name: "3 - Banana",
      searchText: "banana"
    }
  ];

  selectedItem: any;

  constructor() {
  }

  public commoditySelected(item) {
    this.selectedItem = item;
  }

}
```

```html
<typeahead
  [list]="items"
  [searchProperty]="'searchText'" [displayProperty]="'name'"
  [maxSuggestions]="3"
  (suggestionSelected)="itemSelected($event)"
  placeholder="Enter text">
</typeahead>
```

# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/brinkmanjg/ng2-typeahead/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding, and apologies for any issues experienced thus far.

### License

The MIT License (see the [LICENSE](https://github.com/brinkmanjg/ng2-typeahead/blob/master/LICENSE) file for the full text)
