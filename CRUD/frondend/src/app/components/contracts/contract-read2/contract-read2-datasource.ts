import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Contract } from '../contract.model';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Contract[] = [
    {   
      "id": 1,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5000,
        "salaryAmountYear": 60000,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste",
      "hoursAmountMonth": 10,
      "startDateContract": "2024-02-02T21:45:29.380Z",
      "endDateContract": "2025-02-02T21:45:29.380Z"
    },
    {   
      "id": 2,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5100,
        "salaryAmountYear": 61200,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste2",
      "hoursAmountMonth": 12,
      "startDateContract": "2024-03-02T21:45:29.380Z",
      "endDateContract": "2025-03-02T21:45:29.380Z"
    },
    {   
      "id": 3,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5200,
        "salaryAmountYear": 62400,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste3",
      "hoursAmountMonth": 14,
      "startDateContract": "2024-04-02T21:45:29.380Z",
      "endDateContract": "2025-04-02T21:45:29.380Z"
    },
    {   
      "id": 4,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5300,
        "salaryAmountYear": 63600,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste4",
      "hoursAmountMonth": 16,
      "startDateContract": "2024-05-02T21:45:29.380Z",
      "endDateContract": "2025-05-02T21:45:29.380Z"
    },
    {   
      "id": 5,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5400,
        "salaryAmountYear": 64800,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste5",
      "hoursAmountMonth": 18,
      "startDateContract": "2024-06-02T21:45:29.380Z",
      "endDateContract": "2025-06-02T21:45:29.380Z"
    },
    {   
      "id": 6,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5500,
        "salaryAmountYear": 66000,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste6",
      "hoursAmountMonth": 20,
      "startDateContract": "2024-07-02T21:45:29.380Z",
      "endDateContract": "2025-07-02T21:45:29.380Z"
    },
    {   
      "id": 7,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5600,
        "salaryAmountYear": 67200,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste7",
      "hoursAmountMonth": 22,
      "startDateContract": "2024-08-02T21:45:29.380Z",
      "endDateContract": "2025-08-02T21:45:29.380Z"
    },
    {   
      "id": 8,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5700,
        "salaryAmountYear": 68400,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste8",
      "hoursAmountMonth": 24,
      "startDateContract": "2024-09-02T21:45:29.380Z",
      "endDateContract": "2025-09-02T21:45:29.380Z"
    },
    {   
      "id": 9,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5800,
        "salaryAmountYear": 69600,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste9",
      "hoursAmountMonth": 26,
      "startDateContract": "2024-10-02T21:45:29.380Z",
      "endDateContract": "2025-10-02T21:45:29.380Z"
    },
    {   
      "id": 10,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 5900,
        "salaryAmountYear": 70800,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste10",
      "hoursAmountMonth": 28,
      "startDateContract": "2024-11-02T21:45:29.380Z",
      "endDateContract": "2025-11-02T21:45:29.380Z"
    },
    {   
      "id": 11,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 6000,
        "salaryAmountYear": 72000,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste11",
      "hoursAmountMonth": 30,
      "startDateContract": "2024-12-02T21:45:29.380Z",
      "endDateContract": "2025-12-02T21:45:29.380Z"
    },
    {   
      "id": 12,
      "employeeId": 1,  
      "salary": {
        "salaryAmountMonth": 6100,
        "salaryAmountYear": 73200,
        "salaryDate": "2024-02-02T21:45:29.380Z"
      },
      "typeContract": "teste12",
      "hoursAmountMonth": 32,
      "startDateContract": "2025-01-02T21:45:29.380Z",
      "endDateContract": "2026-01-02T21:45:29.380Z"
    }
    
  ];

/**
 * Data source for the RoleRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ContractRead2DataSource extends DataSource<Contract> {
  data: Contract[] = EXAMPLE_DATA;
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
  connect(): Observable<Contract[]> {
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
  private getPagedData(data: Contract[]): Contract[] {
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
  private getSortedData(data: Contract[]): Contract[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.typeContract, b.typeContract, isAsc);
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
