import {CdmpTableAction} from './cdmp-table-action.model';

export class CdmpTableConfig {
  title?: string;
  titleTooltip?: string;
  key?: string;
  dataKey?: string;
  paginationRow?: number;
  searchBarField?: any[];
  addBtnTitle?: string;
  actions?: CdmpTableAction[] = [];
  states?: CdmpTableAction[] = [];
  customData?: any;
  loading?: boolean;
  enableReload?: boolean;
  addBtn?: boolean;
  enablePagination?: boolean;
  enableSearchBar?: boolean;
  enableExport?: boolean;
  selectByCheckBox?: boolean;
  selectByRadio?: boolean;
  rowSelect?: boolean;
  displayAction?: boolean;
  displayState?: boolean;
  expandable?: boolean;
  extraFilter?: boolean;
  initialShowDatas?: boolean;

  constructor(obj: any = {}) {
    this.title = obj.title;
    this.titleTooltip = obj.titleTooltip;
    this.loading = obj.loading;
    this.selectByCheckBox = obj.selectByCheckBox;
    this.selectByRadio = obj.selectByRadio;
    this.rowSelect = obj.rowSelect;
    this.key = obj.key;
    this.dataKey = obj.dataKey;
    this.displayAction = obj.displayAction;
    this.displayState = obj.displayState;
    this.paginationRow = obj.paginationRow;
    this.enablePagination = obj.enablePagination ?? true;
    this.enableSearchBar = obj.enableSearchBar ?? true;
    this.enableExport = obj.enableExport;
    this.searchBarField = obj.searchBarField;
    this.enableReload = obj.enableReload;
    this.addBtn = obj.addBtn;
    this.addBtnTitle = obj.addBtnTitle;
    this.actions = obj.actions;
    this.states = obj.states;
    this.customData = obj.customData;
    this.expandable = obj.expandable;
    this.extraFilter = obj.extraFilter;
    this.initialShowDatas = obj.initialShowDatas ?? true;
  }
}
