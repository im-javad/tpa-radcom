export interface MatrixDimensions {
  rows: number;
  cols: number;
}

export interface MatrixCell {
  row: number;
  col: number;
  value: number;
}

export type MatrixData = number[][];
