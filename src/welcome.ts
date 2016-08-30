import { computedFrom, inject, NewInstance } from 'aurelia-framework';
import { ValidationRules, ValidationController } from "aurelia-validation";
import { SimpleValidationRenderer } from './simpleValidationRenderer';

@inject(NewInstance.of(ValidationController))
export class Welcome {
  heading: string = 'Welcome to the Aurelia Navigation App';
  firstName: string = 'John';
  lastName: string = 'Doe';
  previousValue: string = this.fullName;

  message = '';
  controller: ValidationController = null;

  rules = ValidationRules
          .ensure('firstName').displayName("First name").required()
          .ensure('lastName').displayName("Surname").required().minLength(4)
          .rules;

  constructor(controller: ValidationController) {
    this.controller = controller;
    this.controller.addRenderer(new SimpleValidationRenderer());
  }

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below
  //as well as the corresponding import above.
  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    this.previousValue = this.fullName;
    this.controller
      .validate()
      .then(v => {
        if (v.length === 0) {
          this.message = "All is good!";
          alert(`Welcome, ${this.fullName}!`);
        } else {
          this.message = "You have errors!";
        }
      })
  }

  canDeactivate(): boolean {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}
