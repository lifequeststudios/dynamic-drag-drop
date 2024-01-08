import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { DocComponentType } from './enums';
import { NgElement, WithProperties } from '@angular/elements';
import { TextAreaElementComponent } from './sectionElements/text-area-element/text-area-element.component';
import { Guid } from 'guid-typescript';
import { DragItemDirective } from './drag-item.directive';

@Injectable({
  providedIn: 'root'
})
export class SectionBuilderService {
  count: number = 0;
  containerId: string = 'container';
  components: any[] = [];
  docComponentTypes = DocComponentType;
  uniqueId: string = "";

  constructor(private injector: Injector) { }

  addNewSection(sectionType: DocComponentType){
    console.log('clicked')
    // get the container on the page to populate with content
    const container = this.getContainer();

    //Might want to make the component dynamic so that it can be reused
    const sectionEl = this.createAngularElementFromComponent(TextAreaElementComponent, 'doc-section-element')

    // add unique Id to the element
    this.uniqueId = this.genUniqueId("section");
    const json = { id: this.uniqueId, element: sectionEl }
    sectionEl.setAttribute('id', this.uniqueId);
    sectionEl.setAttribute('draggable', 'true');
    sectionEl.setAttribute('DragItem', '');
    // sectionEl.setAttribute('contenteditable', 'true');

    // listen for the close event
    sectionEl.addEventListener('closed', () => {
      // Remove from our list
      const idx = this.components.findIndex((el, idx) => el.element === sectionEl)
      if (idx > -1) {
        this.components.splice(idx, 1)
      }

      // Remove from the DOM
      // document.body.removeChild(textAreaEl)
      container?.removeChild(sectionEl)

      this.updateCount();
    });

    // Add to the DOM
    container?.appendChild(sectionEl)

    // Add to our components list
    // this.components.push(textAreaEl);
    this.components.push(json);

    this.updateCount();


    return sectionEl
  }

  getContainer() {
    return document.getElementById(this.containerId)
  }

  private genUniqueId(prefix: string) {
    // Currently using a prefix for the type of componet + GUID
    return `${prefix}-${Guid.create()}`
  }
  private updateCount() {
    this.count = this.components.length;
  }
  private createAngularElementFromComponent(component: any, name: string) {
    const element: NgElement & WithProperties<typeof component> = document.createElement(name) as any;

  const componentFactory = this.injector.get(ComponentFactoryResolver).resolveComponentFactory(component);
  const componentRef = componentFactory.create(this.injector);
  element.attachShadow({ mode: 'open' }).appendChild(componentRef.location.nativeElement);

  const directive = this.injector.get(DragItemDirective);
  directive.selected = element;
  directive.constructor(element, this.injector);

  return element;
  }
}
