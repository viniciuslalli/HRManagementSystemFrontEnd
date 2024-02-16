import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Department } from '../department.model';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Department[] = [
    { "id": 1, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 2, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 3, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 4, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 5, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 6, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 7, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 8, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 9, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 10, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 11, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 12, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 13, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 14, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 15, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 16, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 17, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 18, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 19, departmentName: 'Developers', description: "Department of the developers" },
    { "id": 20, departmentName: 'Developers', description: "Department of the developers" }
  ];

/**
 * Data source for the DepartmentRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DepartmentRead2DataSource extends DataSource<Department> {
  data: Department[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Department[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Department[]): Department[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Department[]): Department[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'departmentName': return compare(a.departmentName, b.departmentName, isAsc);
        case 'id': return compare(+!a.id, +!b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
