export class PagedResponse<T> {
  result: T;
  paginationInfo: PaginationInfo;
}

export class PaginationInfo {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  currentPage: number;
}
