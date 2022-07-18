enum CdmpActionType {
  'start',
  'open',
  'view',
  'edit',
  'delete',
  'archive',
  'validated',
  'rejected',
  'pending'
}

export class CdmpTableAction {
  type: any = CdmpActionType;
  mini?: boolean;
  callback: any;

  constructor(obj: any = {}) {
    this.type = obj.type;
    this.mini = obj.mini ?? true;
    this.callback = obj.callback;
  }
}
