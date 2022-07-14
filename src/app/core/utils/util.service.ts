import {Injectable} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Selectable} from './selectable.intercafe';
import {map, Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private translateService: TranslateService,
  ) { }


  getSelectPlaceholder(placeholder = 'COMMON.ACTIONS.SELECT'): SelectItem {
    const item: SelectItem = { value: null, label: '' };
    this.translateService.get(placeholder).subscribe((label) => (item.label = label));
    return item;
  }

  getTranslatedToSelectItem(
    items: Selectable[],
    valuePath = 'value',
    prefix?: string,
    placeholder = 'COMMON.ACTIONS.SELECT',
  ): SelectItem[] {
    const selectItems = items.map((item) => item.toSelectItem());
    if (prefix) {
      selectItems.forEach((item) =>
        this.translateService
          .get(`${prefix}.${_.get(item, valuePath)}`)
          .subscribe((label) => (item.label = label)),
      );
    }
    selectItems.unshift(this.getSelectPlaceholder(placeholder));
    return selectItems;
  }

  mapToSelectItems(
    obs: Observable<Selectable[]>,
    prefix = '',
    valuePath = 'value',
    placeholder = 'COMMON.ACTIONS.SELECT',
  ): Observable<SelectItem[]> {
    return obs.pipe(map((items) => this.getTranslatedToSelectItem(items, valuePath, prefix, placeholder)));
  }


}
