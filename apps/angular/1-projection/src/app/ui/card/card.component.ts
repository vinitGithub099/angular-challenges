import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="card-image"></ng-content>
      <section>
        @for (item of list(); track $index) {
          <ng-container
            *ngTemplateOutlet="
              itemTemplate;
              context: { $implicit: item }
            "></ng-container>
        }
      </section>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  imports: [NgTemplateOutlet],
})
export class CardComponent {
  readonly list = input<any[] | null>(null);
  readonly customClass = input('');

  @Input() itemTemplate?: TemplateRef<any>;

  @Output() addItemEvent = new EventEmitter<void>();

  addNewItem() {
    this.addItemEvent.emit();
  }
}
