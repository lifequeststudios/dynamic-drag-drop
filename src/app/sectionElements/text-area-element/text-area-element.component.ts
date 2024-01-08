import { NgIf } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionBuilderService } from '../../section-builder.service';
@Component({
  selector: 'app-text-area-element',
  standalone: true,
  imports: [],
  templateUrl: './text-area-element.component.html',
  styleUrl: './text-area-element.component.scss'
})
export class TextAreaElementComponent {
  state: 'opened' | 'closed' = 'closed';
  private _value = '';  
  public id: string;

  constructor(
    public sectionBuilder: SectionBuilderService,
    private el: ElementRef,
    private renderer: Renderer2
    ) {
    this.id = sectionBuilder.uniqueId;
    // this.renderer.listen(this.el.nativeElement, 'ondrag', this.dragStart())
  }
}
