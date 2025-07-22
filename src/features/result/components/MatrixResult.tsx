import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/atoms";
import { MatrixData } from "../../../types/matrix.types";
import { sortMatrixRows } from "../../../utils/matrix.utils";
import "./MatrixResult.scss";

export const MatrixResult: React.FC = () => {
  const navigate = useNavigate();
  const [originalMatrix, setOriginalMatrix] = useState<MatrixData | null>(null);
  const [sortedMatrix, setSortedMatrix] = useState<MatrixData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("matrixData");
    if (!stored) {
      navigate("/");
      return;
    }

    const matrix = JSON.parse(stored);
    setOriginalMatrix(matrix);
    setSortedMatrix(sortMatrixRows(matrix));
  }, [navigate]);

  const handleNewMatrix = () => {
    localStorage.removeItem("matrixDimensions");
    localStorage.removeItem("matrixData");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/matrix-input");
  };

  if (!originalMatrix || !sortedMatrix) return null;

  const renderMatrix = (matrix: MatrixData, title: string) => (
    <div className="matrix-result__section">
      <h2>{title}</h2>
      <div className="matrix-result__table-wrapper">
        <table className="matrix-result__table">
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={i % 2 === 0 ? "ascending" : "descending"}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="matrix-result">
      <h1>نتیجه مرتب‌سازی</h1>
      <p className="matrix-result__description">
        سطرهای زوج به صورت صعودی و سطرهای فرد به صورت نزولی مرتب شده‌اند
      </p>

      <div className="matrix-result__content">
        {renderMatrix(originalMatrix, "آرایه اولیه")}
        <div className="matrix-result__arrow">←</div>
        {renderMatrix(sortedMatrix, "آرایه مرتب شده")}
      </div>

      <div className="matrix-result__actions">
        <Button variant="secondary" onClick={handleBack}>
          ویرایش مقادیر
        </Button>
        <Button onClick={handleNewMatrix}>ایجاد آرایه جدید</Button>
      </div>
    </div>
  );
};
