import { MatrixData } from "../types/matrix.types";

export function sortMatrixRows(matrix: MatrixData): MatrixData {
  const sortedMatrix: MatrixData = [];

  for (let i = 0; i < matrix.length; i++) {
    const row = [...matrix[i]];

    if (i % 2 === 0) {
      row.sort((a, b) => a - b);
    } else {
      row.sort((a, b) => b - a);
    }

    sortedMatrix.push(row);
  }

  return sortedMatrix;
}

export function createEmptyMatrix(rows: number, cols: number): MatrixData {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}
