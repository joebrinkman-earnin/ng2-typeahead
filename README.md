# ng2-autocomplete
Autocomplete component for Angular 2

***ng2-autocomplete*** is an autocomplete/typeahead component for Angular2.

## Demo

[http://jankuri.com/components/angular2-datepicker](http://jankuri.com/components/angular2-datepicker)

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
ng install ng2-autocomplete
````

## Use Example:

```ts
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Autocomplete} from 'ng2-autocomplete';

class Test {
  date: string;
}

@Component({
  template: `
    <autocomplete [list]="test.date"></datepicker>
  `,
  directives: [Autocomplete, FORM_DIRECTIVES]
})

class App {
  test: Test;
  test1: Test;
  
  constructor() {
    this.test = Test();
    this.test1 = Test();
  }
}
```

## Author

[Joe Brinkman]

## Licence

This project is licensed under the GNU license. See the [LICENSE](LICENSE) file for more info.
