import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Role } from '../roles.model';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Role[] = [
  { "id": 1, "name": "Back-end", "benefits": "Part-time" },
  { "id": 2, "name": "Front-end", "benefits": "Full-time" },
  { "id": 3, "name": "Database Administrator", "benefits": "Full-time" },
  { "id": 4, "name": "Software Engineer", "benefits": "Full-time" },
  { "id": 5, "name": "DevOps Engineer", "benefits": "Full-time" },
  { "id": 6, "name": "UI/UX Designer", "benefits": "Part-time" },
  { "id": 7, "name": "Quality Assurance Tester", "benefits": "Full-time" },
  { "id": 8, "name": "Network Administrator", "benefits": "Full-time" },
  { "id": 9, "name": "Data Scientist", "benefits": "Full-time" },
  { "id": 10, "name": "System Analyst", "benefits": "Part-time" },
  { "id": 11, "name": "Technical Support Specialist", "benefits": "Full-time" },
  { "id": 12, "name": "Project Manager", "benefits": "Full-time" },
  { "id": 13, "name": "Business Analyst", "benefits": "Part-time" },
  { "id": 14, "name": "Cyber Security Analyst", "benefits": "Full-time" },
  { "id": 15, "name": "Mobile App Developer", "benefits": "Full-time" },
  { "id": 16, "name": "Cloud Architect", "benefits": "Part-time" },
  { "id": 17, "name": "Game Developer", "benefits": "Full-time" },
  { "id": 18, "name": "Embedded Systems Engineer", "benefits": "Full-time" },
  { "id": 19, "name": "AI/ML Engineer", "benefits": "Full-time" },
  { "id": 20, "name": "Technical Writer", "benefits": "Part-time" }
  ];

/**
 * Data source for the RoleRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RoleRead2DataSource extends DataSource<Role> {
  data: Role[] = EXAMPLE_DATA;
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
  connect(): Observable<Role[]> {
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
  private getPagedData(data: Role[]): Role[] {
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
  private getSortedData(data: Role[]): Role[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
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
