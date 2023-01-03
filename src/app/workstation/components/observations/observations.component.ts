import { Component, OnInit ,AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren} from '@angular/core';
  import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
  import { UtilisateurService } from '../../service/utilisateur/utilisateur.service';
import { PrimeIcons } from 'primeng/api';
@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentState', [
      state('active', style({
        position: 'relative', 'z-index': 2, opacity: 1,
      })),
      transition('right => active', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateX(100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
        ]))
      ]),
      transition('active => right', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
      ]),
      transition('active => left', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 1, transform: 'translateX(0%)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 })
        ]))
      ]),
      transition('left => active', [
        style({
          transform: 'translateX(100%)'
        }),
        animate('400ms ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0%)', offset: 1.0 })
        ]))
      ]),
    ])
  ]
})
export class ObservationsComponent implements AfterViewInit {
  prevLinkInactive: boolean = true;
  poste : string;
  nextLinkInactive: boolean = false;
  events1: any[];

  loaded: boolean = false;
  selectedIndex: number = 0;
  @ViewChild('eventsWrapper') eventsWrapper: ElementRef;
  @ViewChild('fillingLine') fillingLine: ElementRef;
  @ViewChildren('timelineEvents') timelineEvents: QueryList<ElementRef>;
  eventsWrapperWidth: number = 0;
  private _viewInitialized = false;


  constructor(private _cdr: ChangeDetectorRef , private utilisateurService : UtilisateurService) { }
  

  private _timelineWrapperWidth = 720;

  
  // @Input()
  // set timelineWrapperWidth(value: number) {
  //   this._timelineWrapperWidth = value;
  //   this._cdr.detectChanges();
  // }

  // private _eventsMinDistance: number = 80;

  // @Input()
  // set eventsMinDistance(value: number) {
  //   this._eventsMinDistance = value;
  //   this.initView();
  // }

  // private _timelineElements: TimelineElement[];

  // get timelineElements(): TimelineElement[] {
  //   return this._timelineElements;
  // }

  // @Input()
  // set timelineElements(value: TimelineElement[]) {
  //   this._timelineElements = value;
  //   this.initView();
  // }

  // private _dateFormat: string = 'dd.MM.yyyy';

  // get dateFormat(): string {
  //   return this._dateFormat;
  // }

  // @Input()
  // set dateFormat(value: string) {
  //   this._dateFormat = value;
  //   this.initView();
  // }

  // private _disabled: boolean = false;

  // @Input()
  // set disabled(value: boolean) {
  //   this._disabled = value;
  // }

  // private _showContent: boolean = false;

  // get showContent(): boolean {
  //   return this._showContent;
  // }

  // @Input()
  // set showContent(value: boolean) {
  //   this._showContent = value;
  //   this._cdr.detectChanges();
  // }

  // private static pxToNumber(val: string): number {
  //   return Number(val.replace('px', ''));
  // }

  // private static getElementWidth(element: Element): number {
  //   const computedStyle = window.getComputedStyle(element);
  //   if (!computedStyle.width) {
  //     return 0;
  //   }
  //   return ObservationsComponent.pxToNumber(computedStyle.width);
  // }

  // private static parentElement(element: any, tagName: string) {
  //   if (!element || !element.parentNode) {
  //     return null;
  //   }

  //   let parent = element.parentNode;
  //   while (true) {
  //     if (parent.tagName.toLowerCase() == tagName) {
  //       return parent;
  //     }
  //     parent = parent.parentNode;
  //     if (!parent) {
  //       return null;
  //     }
  //   }
  // }

  // private static getTranslateValue(timeline: Element) {
  //   let timelineStyle = window.getComputedStyle(timeline);
  //   let timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
  //     timelineStyle.getPropertyValue('-moz-transform') ||
  //     timelineStyle.getPropertyValue('-ms-transform') ||
  //     timelineStyle.getPropertyValue('-o-transform') ||
  //     timelineStyle.getPropertyValue('transform');

  //   let translateValue = 0;
  //   if (timelineTranslate.indexOf('(') >= 0) {
  //     let timelineTranslateStr = timelineTranslate
  //       .split('(')[1]
  //       .split(')')[0]
  //       .split(',')[4];
  //     translateValue = Number(timelineTranslateStr);
  //   }

  //   return translateValue;
  // }

  
  // private static setTransformValue(element: any, property: any, value: any) {
  //   element.style['-webkit-transform'] = property + '(' + value + ')';
  //   element.style['-moz-transform'] = property + '(' + value + ')';
  //   element.style['-ms-transform'] = property + '(' + value + ')';
  //   element.style['-o-transform'] = property + '(' + value + ')';
  //   element.style['transform'] = property + '(' + value + ')';
  // }

  // private static dayDiff(first: Date, second: Date): number {
  //   console.log(first);
  //   console.log(second);

    
  //   return Math.round(second.getTime() - first.getTime());
  // }

  // private static minLapse(elements: TimelineElement[]): number {
  //   if (elements && elements.length && elements.length === 1) {
  //     return 0;
  //   }

  //   let result: number = 0;
  //   for (let i = 1; i < elements.length; i++) {
  //     let distance = ObservationsComponent.dayDiff(elements[i - 1].dateObservation, elements[i].dateObservation);
  //     result = result ? Math.min(result, distance) : distance;
  //   }
  //   return result * 0.5;
  // }

  ngAfterViewInit(): void {
    this._cdr.detach();
    this._viewInitialized = true;
  //   this.events1 = [
  //     {status: 'Ordered', date: '15/10/2020 10:30', icon: PrimeIcons.SHOPPING_CART, color: '#9C27B0', image: 'game-controller.jpg'},
  //     {status: 'Processing', date: '15/10/2020 14:00', icon: PrimeIcons.COG, color: '#673AB7'},
  //     {status: 'Shipped', date: '15/10/2020 16:15', icon: PrimeIcons.ENVELOPE, color: '#FF9800'},
  //     {status: 'Delivered', date: '16/10/2020 10:00', icon: PrimeIcons.CHECK, color: '#607D8B'}
  // ];

  //   this.initView();
  //  // this.poste = localStorage.getItem('profil');
  //   //this.poste = this.utilisateurService.getById
  //   console.log(this.poste)

  // }

  // onScrollClick(event: Event, forward: boolean) {
  //   event.preventDefault();
  //   this.updateSlide(this.eventsWrapperWidth, forward);
  //   this._cdr.detectChanges();
  // }

  // onEventClick(event: Event, selectedItem: TimelineElement) {
  //   event.preventDefault();
  //   if (this._disabled) {
  //     return;
  //   }
  //   let element = event.target;
  //   // detect click on the a single event - show new event content
  //   let visibleItem = this._timelineElements[0];
  //   this._timelineElements.forEach(function (item: TimelineElement) {
  //     if (item.selected && item != selectedItem) {
  //       visibleItem = item;
  //       item.selected = false;
  //     }
  //   });
  //   this.selectedIndex = this._timelineElements.indexOf(selectedItem);
  //   selectedItem.selected = true;
  //   this.updateFilling(element);
  //   this._cdr.detectChanges();
  // }

  // initTimeline(timeLines: TimelineElement[]) {
  //   let eventsMinLapse = ObservationsComponent.minLapse(timeLines);
  //   // assign a left position to the single events along the timeline
  //   this.setDatePosition(timeLines, this._eventsMinDistance, eventsMinLapse);
  //   // assign a width to the timeline
  //   this.setTimelineWidth(timeLines, this._eventsMinDistance, eventsMinLapse);
  //   // the timeline has been initialize - show it
  //   this.loaded = true;
  // }

  // updateSlide(timelineTotWidth: number, forward: boolean) {
  //   let translateValue = ObservationsComponent.getTranslateValue(this.eventsWrapper.nativeElement);

  //   if (forward) {
  //     this.translateTimeline(translateValue - this._timelineWrapperWidth + this._eventsMinDistance, this._timelineWrapperWidth - timelineTotWidth)
  //   } else {
  //     this.translateTimeline(translateValue + this._timelineWrapperWidth - this._eventsMinDistance, null);
  //   }
  // }

  // updateTimelinePosition(element: Element) {
  //   let eventStyle = window.getComputedStyle(element);
  //   let eventLeft = ObservationsComponent.pxToNumber(eventStyle.getPropertyValue('left'));
  //   let translateValue = ObservationsComponent.getTranslateValue(this.eventsWrapper.nativeElement);

  //   if (eventLeft > this._timelineWrapperWidth - translateValue) {
  //     this.translateTimeline(-eventLeft + this._timelineWrapperWidth / 2, this._timelineWrapperWidth - this.eventsWrapperWidth);
  //   }
  // }

  // translateTimeline(value: number, totWidth: number | null) {
  //   // only negative translate value
  //   value = (value > 0) ? 0 : value;
  //   // do not translate more than timeline width
  //   value = ( !(totWidth === null) && value < totWidth ) ? totWidth : value;
  //   ObservationsComponent.setTransformValue(this.eventsWrapper.nativeElement, 'translateX', value + 'px');
  //   // update navigation arrows visibility
  //   this.prevLinkInactive = value === 0;
  //   this.nextLinkInactive = value === totWidth;
  // }

  // setTimelineWidth(elements: TimelineElement[], width: number, eventsMinLapse: number) {
  //   let timeSpan = 100;
  //   if (elements.length > 1) {
  //     timeSpan = ObservationsComponent.dayDiff(elements[0].dateObservation, elements[elements.length - 1].dateObservation);
  //   }
  //   let timeSpanNorm = timeSpan / eventsMinLapse;
  //   timeSpanNorm = Math.round(timeSpanNorm) + 4;
  //   this.eventsWrapperWidth = timeSpanNorm * width;
  //   let aHref = this.eventsWrapper.nativeElement.querySelectorAll('a.selected')[0];

  //   this.updateFilling(aHref);
  //   this.updateTimelinePosition(aHref);
  //   return this.eventsWrapperWidth;
  // }

  // private updateFilling(element: any) {
  //   // change .filling-line length according to the selected event
  //   console.log(element);
    
  //   let eventStyle = window.getComputedStyle(element);
  //   let eventLeft = eventStyle.getPropertyValue('left');
  //   let eventWidth = eventStyle.getPropertyValue('width');
  //   let eventLeftNum = ObservationsComponent.pxToNumber(eventLeft) + ObservationsComponent.pxToNumber(eventWidth) / 2;
  //   let scaleValue = eventLeftNum / this.eventsWrapperWidth;
  //   ObservationsComponent.setTransformValue(this.fillingLine.nativeElement, 'scaleX', scaleValue);
  // }

  // private initView(): void {
  //   if (!this._viewInitialized) {
  //     return;
  //   }

  //   if (this._timelineElements && this._timelineElements.length) {
  //     for (let i = 0; i < this._timelineElements.length; i++) {
  //       if (this._timelineElements[i].selected) {
  //         this.selectedIndex = i;
  //         break;
  //       }
  //     }
  //     this.initTimeline(this._timelineElements);
  //   }
  //   this._cdr.detectChanges();
  // }

  // private setDatePosition(elements: TimelineElement[], min: number, eventsMinLapse: number) {
  //   let timelineEventsArray = this.timelineEvents.toArray();
  //   let i: number = 0;
  //   for (let component of elements) {
  //     let distance = ObservationsComponent.dayDiff(elements[0].dateObservation, component.dateObservation);
  //     let distanceNorm = Math.round(distance / eventsMinLapse);
  //     timelineEventsArray[i].nativeElement.style.left = distanceNorm * min + 'px';
  //     // span
  //     let span: HTMLSpanElement = <HTMLSpanElement>timelineEventsArray[i].nativeElement.parentElement.children[1];
  //     let spanWidth = ObservationsComponent.getElementWidth(span);
  //     span.style.left = distanceNorm * min + spanWidth / 2 + 'px';
  //     i++;
  //   }
  // }

}
}