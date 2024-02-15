import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Employee } from '../employee.model';



// TODO: replace this with real data from your application
const EXAMPLE_DATA: Employee[] = [
  { id: 1, name: 'Vinicius', surname: 'Lalli', salary: 45000, gender: 'MALE', address: 'Curitiba', email: 'vinicius@gmail.com', phonenumber: '555', nationality: 'Brazilian', dateOfBirth: '1994-06-11'},
  { id: 2, name: 'Maria', surname: 'Silva', salary: 52000, gender: 'FEMALE', address: 'São Paulo', email: 'maria@gmail.com', phonenumber: '123', nationality: 'Brazilian', dateOfBirth: '1990-03-15'},
  { id: 3, name: 'John', surname: 'Doe', salary: 60000, gender: 'MALE', address: 'New York', email: 'john.doe@example.com', phonenumber: '789', nationality: 'American', dateOfBirth: '1985-11-22'},
  { id: 4, name: 'Anna', surname: 'Johnson', salary: 48000, gender: 'FEMALE', address: 'London', email: 'anna.johnson@example.com', phonenumber: '456', nationality: 'British', dateOfBirth: '1988-07-30'},
  { id: 5, name: 'Carlos', surname: 'Garcia', salary: 51000, gender: 'MALE', address: 'Madrid', email: 'carlos.garcia@example.com', phonenumber: '789', nationality: 'Spanish', dateOfBirth: '1992-05-18'},
  { id: 6, name: 'Luisa', surname: 'Martinez', salary: 49000, gender: 'FEMALE', address: 'Barcelona', email: 'luisa.martinez@example.com', phonenumber: '012', nationality: 'Spanish', dateOfBirth: '1991-09-03'},
  { id: 7, name: 'Mohammed', surname: 'Ali', salary: 55000, gender: 'MALE', address: 'Cairo', email: 'mohammed.ali@example.com', phonenumber: '345', nationality: 'Egyptian', dateOfBirth: '1987-12-08'},
  { id: 8, name: 'Chen', surname: 'Wei', salary: 58000, gender: 'FEMALE', address: 'Beijing', email: 'chen.wei@example.com', phonenumber: '678', nationality: 'Chinese', dateOfBirth: '1993-04-25'},
  { id: 9, name: 'Alex', surname: 'Gonzalez', salary: 47000, gender: 'MALE', address: 'Madrid', email: 'alex.gonzalez@example.com', phonenumber: '234', nationality: 'Spanish', dateOfBirth: '1990-08-12'},
  { id: 10, name: 'Emily', surname: 'Brown', salary: 49000, gender: 'FEMALE', address: 'New York', email: 'emily.brown@example.com', phonenumber: '789', nationality: 'American', dateOfBirth: '1995-02-28'},
  { id: 11, name: 'Satoshi', surname: 'Nakamoto', salary: 1000000, gender: 'MALE', address: 'Tokyo', email: 'satoshi.nakamoto@example.com', phonenumber: '123', nationality: 'Japanese', dateOfBirth: '1975-04-05'},
  { id: 12, name: 'Elena', surname: 'Rodriguez', salary: 46000, gender: 'FEMALE', address: 'Barcelona', email: 'elena.rodriguez@example.com', phonenumber: '456', nationality: 'Spanish', dateOfBirth: '1989-11-15'},
  { id: 13, name: 'Ahmed', surname: 'Mohamed', salary: 53000, gender: 'MALE', address: 'Cairo', email: 'ahmed.mohamed@example.com', phonenumber: '789', nationality: 'Egyptian', dateOfBirth: '1988-03-20'},
  { id: 14, name: 'Yukiko', surname: 'Tanaka', salary: 49000, gender: 'FEMALE', address: 'Osaka', email: 'yukiko.tanaka@example.com', phonenumber: '012', nationality: 'Japanese', dateOfBirth: '1992-09-10'},
  { id: 15, name: 'Ricardo', surname: 'Fernandez', salary: 48000, gender: 'MALE', address: 'São Paulo', email: 'ricardo.fernandez@example.com', phonenumber: '345', nationality: 'Brazilian', dateOfBirth: '1991-07-22'},
  { id: 16, name: 'Sophia', surname: 'Lee', salary: 47000, gender: 'FEMALE', address: 'Seoul', email: 'sophia.lee@example.com', phonenumber: '678', nationality: 'South Korean', dateOfBirth: '1993-10-05'},
  { id: 17, name: 'Gabriel', surname: 'Garcia', salary: 55000, gender: 'MALE', address: 'Buenos Aires', email: 'gabriel.garcia@example.com', phonenumber: '901', nationality: 'Argentinian', dateOfBirth: '1987-02-14'},
  { id: 18, name: 'Aisha', surname: 'Khan', salary: 51000, gender: 'FEMALE', address: 'Karachi', email: 'aisha.khan@example.com', phonenumber: '234', nationality: 'Pakistani', dateOfBirth: '1994-06-29'},
  { id: 19, name: 'Matteo', surname: 'Ricci', salary: 59000, gender: 'MALE', address: 'Rome', email: 'matteo.ricci@example.com', phonenumber: '567', nationality: 'Italian', dateOfBirth: '1986-12-17'},
  { id: 20, name: 'Fatima', surname: 'Abdel', salary: 48000, gender: 'FEMALE', address: 'Cairo', email: 'fatima.abdel@example.com', phonenumber: '890', nationality: 'Egyptian', dateOfBirth: '1990-04-03'}
];

/**
 * Data source for the EmployeeRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmployeeRead2DataSource extends DataSource<Employee> {
  data: Employee[] = EXAMPLE_DATA;
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
  connect(): Observable<Employee[]> {
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
  private getPagedData(data: Employee[]): Employee[] {
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
  private getSortedData(data: Employee[]): Employee[] {
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
