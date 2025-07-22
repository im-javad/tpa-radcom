import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/atoms";
import { MatrixDimensions, MatrixData } from "../../../types/matrix.types";
import "./MatrixInput.scss";

export const MatrixInput: React.FC = () => {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState<MatrixDimensions | null>(null);
  const [matrixValues, setMatrixValues] = useState<string[][]>([]);
  const [errors, setErrors] = useState<boolean[][]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("matrixDimensions");
    if (!stored) {
      navigate("/");
      return;
    }
    const dims = JSON.parse(stored);
    setDimensions(dims);

    const initialMatrix = Array(dims.rows)
      .fill(null)
      .map(() => Array(dims.cols).fill(""));
    setMatrixValues(initialMatrix);

    const initialErrors = Array(dims.rows)
      .fill(null)
      .map(() => Array(dims.cols).fill(false));
    setErrors(initialErrors);
  }, [navigate]);

  if (!dimensions) return null;

  const validateCell = (value: string): boolean => {
    return /^-?\d+$/.test(value) && value !== "";
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const newValues = [...matrixValues];
    newValues[row][col] = value;
    setMatrixValues(newValues);

    const newErrors = [...errors];
    newErrors[row][col] = !validateCell(value);
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = [...errors];

    for (let i = 0; i < dimensions.rows; i++) {
      for (let j = 0; j < dimensions.cols; j++) {
        const isValid = validateCell(matrixValues[i][j]);
        newErrors[i][j] = !isValid;
        if (!isValid) hasError = true;
      }
    }

    setErrors(newErrors);

    if (!hasError) {
      const matrix: MatrixData = matrixValues.map((row) =>
        row.map((cell) => parseInt(cell, 10))
      );

      localStorage.setItem("matrixData", JSON.stringify(matrix));
      navigate("/result");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="matrix-input">
      <h1>وارد کردن مقادیر آرایه</h1>
      <p className="matrix-input__description">
        لطفاً مقادیر عددی را در خانه‌های جدول وارد کنید
      </p>

      <form onSubmit={handleSubmit} className="matrix-input__form">
        <div
          className="matrix-input__grid"
          style={{
            gridTemplateColumns: `repeat(${dimensions.cols}, 1fr)`,
          }}
        >
          {Array.from({ length: dimensions.rows }).map((_, i) =>
            Array.from({ length: dimensions.cols }).map((_, j) => (
              <div
                key={`cell_${i}_${j}`}
                className="matrix-input__cell-wrapper"
              >
                <Input
                  value={matrixValues[i]?.[j] || ""}
                  onChange={(e) => handleCellChange(i, j, e.target.value)}
                  type="text"
                  error={errors[i]?.[j] ? "عدد صحیح وارد کنید" : undefined}
                  placeholder="0"
                  className="matrix-input__cell"
                />
              </div>
            ))
          )}
        </div>

        <div className="matrix-input__actions">
          <Button type="button" variant="secondary" onClick={handleBack}>
            بازگشت
          </Button>
          <Button type="submit">مرتب‌سازی</Button>
        </div>
      </form>
    </div>
  );
};
