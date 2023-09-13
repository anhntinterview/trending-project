export function isNotVoid<T>(value: T | void): value is T {
  return value !== undefined;
}
export type MapErrorType = { errors: ({ [type: string]: string } | undefined)[] };

export type MessageType = { [type: string]: string | boolean }
