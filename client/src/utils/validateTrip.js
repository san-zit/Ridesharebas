import { toast } from "react-toastify";

export const validateTrip = (form) => {
  const start = Number(form.startkm);
  const end = Number(form.endkm);

  if (!form.date) {
    toast.error("Please select a date");
    return false;
  }

  if (form.startkm === "") {
    toast.error("Please enter start odometer");
    return false;
  }

  if (form.endkm === "") {
    toast.error("Please enter end odometer");
    return false;
  }

  if (start < 0 || end < 0) {
    toast.error("Odometer values cannot be negative");
    return false;
  }

  if (end <= start) {
    toast.error("End KM must be greater than Start KM");
    return false;
  }

  if (!form.purpose) {
    toast.error("Please select a trip category");
    return false;
  }

  return true;
};
