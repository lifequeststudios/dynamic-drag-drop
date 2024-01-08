import { Directive } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dragitem]',
  standalone: true
})
export class DragItemDirective {
  selected: any = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
    ) { 
      this.renderer.listen(this.el.nativeElement, 'dragstart', () => {
        this.dragStart(el);
      });
      this.renderer.listen(this.el.nativeElement, 'dragover', () => {
        this.dragOver(el);
      });
      this.renderer.listen(this.el.nativeElement, 'dragend', () => {
        this.dragEnd();
      });
    }

  dragOver(e: any) {
    console.log('=====================')
    console.log('onDragOver');
    console.log('=====================')


    // NOTE: This shouldn't be allowed if one of the parent nodes are null
    let okToContinue = false
    if (this.selected != null && e.target != null) {
      if (this.selected.parentNode != null && e.target.parentNode != null) {
        okToContinue = true;
      }
    }

    if (okToContinue) {
      console.log('okToContinue ... ');
      console.log('selected.id', this.selected.id)
      console.log('target.id', e.target.id)
      
      // Make sure the e.target is a draggable element
      let target = e.target;
      if (!e.target.draggable) {
        console.log('Wrong target, changing back to draggable parent')
        // To do that we have to back up to the parent that has the draggable attribute set to true
        // target = e.target.parentElement
        target = this.findParentDraggableElement(target)
        if (!target) {
          'Error finding draggable Parent Target'
        }
        console.log('New target = ', target.id)
      }


      // if (this.isBefore(this.selected, e.target)) {
      if (this.isBefore(this.selected, target)) {
        console.log('OUT: isBefore is true')
        // e.target.parentNode.insertBefore(this.selected, e.target)
        target.parentNode.insertBefore(this.selected, target)
      } else {
        console.log('OUT: isBefore is false')
        console.log('selected.id', this.selected.id)
        console.log('target.id', target.id)
        
        if (target.parentNode) {
          console.log('target.parentNode.id = ', target.parentNode.id)
        } else {
          console.log('target.parentNode is null')
        }
        if (target.nextSibling) {
          console.log('target.nextSibling.id = ', target.nextSibling.id)
        } else {
          console.log('target.nextSibling is null')
        }
        target.parentNode.insertBefore(this.selected, target.nextSibling)
      }
    } else {
      console.log('=====================')
      console.log('PROBLEM with nodes');
      console.log('=====================')      
      if (this.selected) {
        if (!this.selected.parentNode) {
          console.log('this.selected.parentNode is null')
        }
      } else {
        console.log('this.selected is null')
      }
      if (e.target) {
        if (e.target.parentNode) {
          console.log('e.target.parentNode is null')
        }
      } else {
        console.log('e.target is null')
      }
    }
  }
  
  findParentDraggableElement(target: any) {
    console.log(`Finding Parent Draggable Element for ${target.id}`)
    if (target.id === 'section-1') {
      console.log('break')
    }
    let parentEl = null
    while (target.parentElement) {
      parentEl = target.parentElement
      if (parentEl.draggable) {
        // Success - get out
        break;
      }
    }
    if (!target.parentElement) {
      console.log('Error')
    }
    return parentEl;
  }

  dragEnd() {
    this.selected = null
  }
  
  dragStart(e: any) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', null)
    this.selected = e.target
  }
  
  isBefore(el1: any, el2: any) {
    console.log('=====================')
    console.log('isBefore');
    console.log('=====================')
    console.log(el1.id);
    console.log(el2.id);
    // if (!el1.previousSibling) {
    //   console.log('el1 previousSibling is null');
    // }
    // if (!el2.previousSibling) {
    //   console.log('el2 previousSibling is null');
    // }
    if (!el1.parentNode) {
      console.log('el1.parentNode is null')
    }
    if (!el2.parentNode) {
      console.log('el1.parentNode is null')
    }
    console.log(el1.parentNode === el2.parentNode ? 'Parent nodes are equal' : ' Parent nodes are different')

    try {
      let cur
      if (el2.parentNode === el1.parentNode) {
        for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
          if (cur === el2) {
            return true
          }
        }
      }
    } catch (ex) {
      console.log(ex);
    }
    return false;
  }  

}
