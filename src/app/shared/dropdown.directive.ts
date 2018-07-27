import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2
} from "@angular/core";

@Directive({
  selector : '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit{

  isOpen : boolean = false;
  private childRef : ElementRef;

  constructor(private elRef : ElementRef, private renderer : Renderer2){}

  ngAfterViewInit() {
    const hostElem = this.elRef.nativeElement;
    this.childRef = hostElem.parentNode.children[1];
  }

  @HostListener('click') toggleOpen(eventData : Event){
    console.log(this.elRef)
     if(this.isOpen){
       this.renderer.removeClass((this.childRef), 'show');
     }
     else{
       this.renderer.addClass(this.childRef,'show');
     }
    this.isOpen = !this.isOpen;
  }
}
