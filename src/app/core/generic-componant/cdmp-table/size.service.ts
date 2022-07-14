import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Dimension} from './dimension.model';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private static _screenSize = new BehaviorSubject<Dimension>({
    width: (window as any).innerWidth,
    height: (window as any).innerHeight,
  });
  public static screenSize$ = SizeService._screenSize.asObservable();

  static set screenSize(screenSize: Dimension) {
    SizeService._screenSize.next(screenSize);
  }

  static get screenSize(): Dimension {
    return SizeService._screenSize.getValue();
  }
}
