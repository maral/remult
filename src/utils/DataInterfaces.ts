import { Column } from './utils';
import { FindOptions } from './DataInterfaces';
import { Entity, Sort } from './data';


export interface DataProvider {
  find(options?: FindOptions): Promise<Array<any>>;
  update(id: any, data: any): Promise<any>;
  delete(id: any): Promise<void>;
  insert(data: any): Promise<any>;
}
export interface FindOptions {
  where?: FilterBase;
  orderBy?: Sort;
  limit?: number;
  page?: number;
}

export interface DataProviderFactory {
  provideFor<T extends Entity>(name: string,factory: () => T): DataProvider;
}
export interface ColumnValueProvider {
  getValue(key: string): any;
  setValue(key: string, value: any): void;
}

export interface DataColumnSettings {
  key?: string;
  caption?: string;
  readonly?: boolean;
  inputType?: string;
  dbName?: string;
}

export interface RowEvents {
  rowDeleted?: () => void;
  rowSaved?: (newRow: boolean) => void;
  rowReset?: (newRow: boolean) => void;
}


export interface FilterBase {
  __addToUrl(add: (name: Column<any>, val: any) => void): void;
}

