import { toast } from "react-toastify";

export const validateEarningForm = (form) => {
  if (!form.dateFrom?.trim()) {
    toast.error("Please select a date from");
    return false;
  }

  if (!form.dateTo?.trim()) {
    toast.error("Please select a date to");
    return false;
  }

  if (!form.earningsType?.trim()) {
    toast.error("Please select an earning type");
    return false;
  }

  if (new Date(form.dateTo) < new Date(form.dateFrom)) {
    toast.error("Date to must be greater than or equal to date from");
    return false;
  }

  if (!form.amount && form.amount !== 0) {
    toast.error("Please enter an amount");
    return false;
  }

  if (isNaN(form.amount) || Number(form.amount) <= 0) {
    toast.error("Amount must be greater than 0");
    return false;
  }

  return true;
};
