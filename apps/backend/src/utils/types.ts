export type TxHash = string;
export type UnixTimestamp = number;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>