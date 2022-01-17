import type { PropsWithChildren, ReactElement } from "react";

export type TableHeader = Record<string, { label: string; infoText?: string }>;

export type TableRowData<Id> = {
  id: Id;
  [key: string]: any;
};

export interface GenericTableProps<Id> {
  headers: TableHeader;
  data: TableRowData<Id>[];
}

export type TGenericTable = <Id>(
  props: PropsWithChildren<GenericTableProps<Id>>
) => ReactElement;
