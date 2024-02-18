import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Role } from '../roles.model';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Role[] = [
  { "id": 1, "name": "Back-end", "position": "Back-end", "benefits": "Part-time" },
  { "id": 2, "name": "Front-end", "position": "Front-end", "benefits": "Full-time" },
  { "id": 3, "name": "UI/UX Designer", "position": "UI/UX Designer", "benefits": "Flexible hours" },
  { "id": 4, "name": "Data Scientist", "position": "Data Scientist", "benefits": "Remote work" },
  { "id": 5, "name": "Software Engineer", "position": "Software Engineer", "benefits": "Health insurance" },
  { "id": 6, "name": "Product Manager", "position": "Product Manager", "benefits": "Paid time off" },
  { "id": 7, "name": "Quality Assurance Engineer", "position": "Quality Assurance Engineer", "benefits": "401(k) matching" },
  { "id": 8, "name": "DevOps Engineer", "position": "DevOps Engineer", "benefits": "Stock options" },
  { "id": 9, "name": "Systems Analyst", "position": "Systems Analyst", "benefits": "Gym membership" },
  { "id": 10, "name": "Network Administrator", "position": "Network Administrator", "benefits": "Flexible spending account" },
  { "id": 11, "name": "Cybersecurity Specialist", "position": "Cybersecurity Specialist", "benefits": "Childcare assistance" },
  { "id": 12, "name": "Database Administrator", "position": "Database Administrator", "benefits": "Tuition reimbursement" },
  { "id": 13, "name": "Technical Support Specialist", "position": "Technical Support Specialist", "benefits": "Paid parental leave" },
  { "id": 14, "name": "Business Analyst", "position": "Business Analyst", "benefits": "Employee assistance program" },
  { "id": 15, "name": "Project Manager", "position": "Project Manager", "benefits": "Company car" },
  { "id": 16, "name": "UI Developer", "position": "UI Developer", "benefits": "Profit sharing" },
  { "id": 17, "name": "IT Manager", "position": "IT Manager", "benefits": "Flexible schedule" },
  { "id": 18, "name": "Software Architect", "position": "Software Architect", "benefits": "Free snacks" },
  { "id": 19, "name": "Machine Learning Engineer", "position": "Machine Learning Engineer", "benefits": "Casual dress code" },
  { "id": 20, "name": "Full-stack Developer", "position": "Full-stack Developer", "benefits": "Performance bonuses" }
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
