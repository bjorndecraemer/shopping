import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener, OnDestroy,
  Renderer2
} from "@angular/core";
import {Observable, Observer, Subscription} from "rxjs";

@Directive({
  selector : '[appDropdown]'
})
export class DropdownDirective implements AfterViewInit, OnDestroy{


  openSubscription : Subscription;
  openTimeout : any;

  isOpen : boolean = false;
  private childRef : ElementRef;

  constructor(private elRef : ElementRef, private renderer : Renderer2){}

  ngAfterViewInit() {
    const hostElem = this.elRef.nativeElement;
    this.childRef = hostElem.parentNode.children[1];
  }

  @HostListener('click') toggleOpen(eventData : Event){
    console.log(this.elRef)
    if(this.openSubscription){
      this.openSubscription.unsubscribe();
    }
     if(this.isOpen){
       if(this.openTimeout){
         clearTimeout(this.openTimeout);
       }
       this.renderer.removeClass((this.childRef), 'show');
     }
     else{
       this.renderer.addClass(this.childRef,'show');
       this.startTimer();
     }
    this.isOpen = !this.isOpen;
  }

  startTimer(){
    console.log("HERE");
    clearTimeout(this.openTimeout);
    this.openSubscription =  Observable.create((observer : Observer<boolean>) => {
      this.openTimeout =setTimeout(() => {
        console.log("AND HERE");
        if(this.isOpen){
          this.isOpen = false;
          this.renderer.removeClass((this.childRef), 'show');
        }
        observer.complete();
      },3000);
    }).subscribe(()=> {});
  }
  ngOnDestroy(){
    this.openSubscription.unsubscribe();
  }
}
