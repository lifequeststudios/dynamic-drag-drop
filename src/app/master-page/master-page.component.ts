import { Component, Injector } from '@angular/core';
import { SectionBuilderService } from '../section-builder.service';
import { TextAreaElementComponent } from '../sectionElements/text-area-element/text-area-element.component';
import { createCustomElement} from '@angular/elements';

@Component({
  selector: 'app-master-page',
  standalone: true,
  imports: [],
  templateUrl: './master-page.component.html',
  styleUrl: './master-page.component.scss'
})
export class MasterPageComponent {

  constructor(
    injector: Injector,
    public sectionBuilder: SectionBuilderService,
    ) {
      // Convert `SectionComponent` to a custom element.
      const textAreaElementComponent = createCustomElement(TextAreaElementComponent, {injector});
      // Register the custom element with the browser.
      customElements.define('doc-section-element', textAreaElementComponent);
    }


}
