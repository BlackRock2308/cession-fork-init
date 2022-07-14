
enum CdmpColType {
  'text',
  'date',
  'progress',
}

export class CdmpTableCols {
  field: string;
  subField?: string;
  header: string;
  type?: any = CdmpColType;
  width?: string;
  multiSelectOptions?: any[];
  selectOptions?: any[];
  onMultiSelect?: ($event: any) => void;
  onDateSelect?: ($event: any) => void;
  sortable?: boolean;
  filterable?: boolean;
  searcheable?: boolean;
  multiselectable?: boolean;
  selectable?: boolean;

  constructor(obj: any = {}) {
    this.field = obj.field;
    this.subField = obj.subField;
    this.header = obj.header;
    this.type = obj.type ?? 'text';
    this.width = obj.width;
    this.multiSelectOptions = obj.multiSelectOptions;
    this.selectOptions = obj.selectOptions;
    this.onMultiSelect = obj.onMultiSelect;
    this.onDateSelect = obj.onMultiSelect;
    this.sortable = obj.sortable;
    this.filterable = obj.filterable;
    this.searcheable = obj.searcheable;
    this.multiselectable = obj.multiselectable;
    this.selectable = obj.selectable;
  }

}
