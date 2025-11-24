import type { FormState } from "../types/quote";

export function validateQuoteForm(form: FormState): Partial<FormState> {
  const newErrors: Partial<FormState> = {};

  if (!form.name.trim()) newErrors.name = "Name is required";

  if (!form.email.trim()) newErrors.email = "Email is required";
  else if (!/^\S+@\S+\.\S+$/.test(form.email))
    newErrors.email = "Enter a valid email";

  if (!form.address.trim()) newErrors.address = "Address is required";

  const phoneValue = form.phone.trim();
  if (phoneValue !== "") {
    const phoneRegex = /^(\+?\d[\d\s-]{7,14})$/;
    if (!phoneRegex.test(phoneValue)) {
      newErrors.phone = "Enter a valid phone number or leave empty";
    }
  }

  const raw = form.averageMonthlyBill.trim();
  const n = raw === "" ? null : parseFloat(raw);
  if (n === null || !Number.isFinite(n))
    newErrors.averageMonthlyBill = "Enter a valid number";
  else if (n < 0) newErrors.averageMonthlyBill = "Must be 0 or greater";

  return newErrors;
}
