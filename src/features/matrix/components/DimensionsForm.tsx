import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "../../../components/atoms";
import "./DimensionsForm.scss";

interface FormErrors {
  rows?: string;
  cols?: string;
}

export const DimensionsForm: React.FC = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState("3");
  const [cols, setCols] = useState("5");
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (
    name: "rows" | "cols",
    value: string
  ): string | undefined => {
    const num = parseInt(value, 10);
    const label = name === "rows" ? "سطرها (n)" : "ستون‌ها (m)";

    if (!value || isNaN(num)) {
      return `تعداد ${label} را وارد کنید`;
    }
    if (num < 3) {
      return `تعداد ${label} باید حداقل 3 باشد`;
    }
    if (num % 2 === 0) {
      return `تعداد ${label} باید فرد باشد`;
    }
    return undefined;
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRows(value);
    const error = validateField("rows", value);
    setErrors((prev) => ({ ...prev, rows: error }));
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCols(value);
    const error = validateField("cols", value);
    setErrors((prev) => ({ ...prev, cols: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const rowsError = validateField("rows", rows);
    const colsError = validateField("cols", cols);

    setErrors({
      rows: rowsError,
      cols: colsError,
    });

    if (!rowsError && !colsError) {
      const dimensions = {
        rows: parseInt(rows, 10),
        cols: parseInt(cols, 10),
      };
      localStorage.setItem("matrixDimensions", JSON.stringify(dimensions));
      navigate("/matrix-input");
    }
  };

  return (
    <div className="dimensions-form">
      <h1>تعیین ابعاد آرایه</h1>
      <p className="dimensions-form__description">
        لطفاً ابعاد آرایه دو بعدی را وارد کنید. ابعاد باید فرد و حداقل 3 باشند
        (مثل 3، 5، 7، 9 و...).
      </p>

      <form onSubmit={handleSubmit} className="dimensions-form__form">
        <Input
          name="cols"
          value={cols}
          onChange={handleColsChange}
          label="تعداد ستون‌ها (m)"
          type="number"
          error={errors.cols}
          fullWidth
          placeholder="مثال: 5"
        />

        <Input
          name="rows"
          value={rows}
          onChange={handleRowsChange}
          label="تعداد سطرها (n)"
          type="number"
          error={errors.rows}
          fullWidth
          placeholder="مثال: 5"
        />

        <Button type="submit" fullWidth size="large">
          ایجاد جدول
        </Button>
      </form>
    </div>
  );
};
