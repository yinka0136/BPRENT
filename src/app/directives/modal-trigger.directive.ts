import {
  Directive,
  OnInit,
  Inject,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { JQ_TOKEN } from '../shared-services/jQuery/jQuery.service';
@Directive({
  selector: '[modal-trigger]',
})
export class ModalTriggerDirective implements OnInit {
  private element: HTMLElement;
  @Input('modal-trigger') modalId: string;
  constructor(
    el: ElementRef,
    @Inject(JQ_TOKEN) private $: any,
    private renderer: Renderer2
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.element.addEventListener('click', (e) => {
      this.$(`#${this.modalId}`).modal({
        backdrop: 'static',
        keyboard: false,
      });
    });
  }
}
