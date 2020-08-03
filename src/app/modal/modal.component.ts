import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @ViewChild('close', { static: false }) close: ElementRef<HTMLElement>;
  @Input() headerTitle: string;
  @Input() submitName: string;
  @Input() elementId: string;
  @Input() modalLg: boolean;
  @Input() centered: boolean;
  @Input() styles: Object = {
    modalBodyHeight: '330px',
    modalContentWidth: '500px'
  };
  @Input() noPaddingBottom: boolean = false;

  constructor() {}

  ngOnInit() {
    document.body.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        event.preventDefault();
        this.close.nativeElement.click();
      }
    });
  }
}
