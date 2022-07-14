export class Pageable {
  sort: any;
  page: number;
  size: number;
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;

  constructor(obj: any = {}) {
    this.sort = obj.sort;
    this.page = obj.page;
    this.size = obj.size;
    this.offset = obj.offset;
    this.pageSize = obj.pageSize;
    this.pageNumber = obj.pageNumber;
    this.unpaged = obj.unpaged;
    this.paged = obj.paged;
  }
}

// ===============================

export class PaginatedResults {
  content: any[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;

  constructor(obj: any = {}) {
    this.content = obj.content;
    this.pageable = obj.pageable ? new Pageable(obj.pageable) : obj.pageable;
    this.totalPages = obj.totalPages;
    this.totalElements = obj.totalElements;
    this.size = obj.size;
    this.number = obj.number;
    this.numberOfElements = obj.numberOfElements;
    this.first = obj.first;
    this.last = obj.last;
    this.empty = obj.empty;
  }
}
