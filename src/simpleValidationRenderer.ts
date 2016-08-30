/**
 *  http://www.sobell.net/aurelia-validation/
 */

import {ValidationError, RenderInstruction} from 'aurelia-validation';

export class SimpleValidationRenderer {

  render(instruction: RenderInstruction) {
    console.log(instruction);
    for (let {error, elements} of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, error);
      }
    }

    for (let {error, elements} of instruction.render) {
      for (let element of elements) {
        this.add(element, error);
      }
    }
  }

  private add(element: Element, error: ValidationError) {
    element.classList.add('has-error');
    // add error div
    const message = document.createElement('div');
    message.className = 'validation-message-div';
    message.textContent = error.message;
    message.id = `validation-message-${error.id}`;
    element.parentNode.insertBefore(message, element.nextSibling);
  }

  private remove(element: Element, error: ValidationError) {
    // remove error div
    const message = element.parentElement.querySelector(`#validation-message-${error.id}`);
    if (message) {
      element.parentElement.removeChild(message);
      element.classList.remove('has-error');
    }
  }
}
