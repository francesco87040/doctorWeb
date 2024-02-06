import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-errormodal',
  templateUrl: './errormodal.component.html',
})
export class ErrormodalComponent {
  @Input() title: string = ''
  @Input() message: string = ''
  constructor() { }
}
