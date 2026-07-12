import { toast } from "react-toastify";

export const validateExpenseForm = (form) => {
  if (!form.date.trim()) {
    toast.error("Please select a date");
    return false;
  }

  if (!form.expensesType.trim()) {
    toast.error("Please select an expense type");
    return false;
  }

  if (!form.amount) {
    toast.error("Please enter an amount");
    return false;
  }

  if (isNaN(form.amount) || Number(form.amount) <= 0) {
    toast.error("Amount must be greater than 0");
    return false;
  }

  return true;
};
