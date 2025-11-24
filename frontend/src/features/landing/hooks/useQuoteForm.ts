import { useMemo, useState } from "react";
import type { FormState } from "../types/quote";
import { createQuote } from "../../../api/quotes";
import { validateQuoteForm } from "../helpers/validate";

type MessageState = { type: "ok" | "err"; text: string } | null;

export function useQuoteForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    address: "",
    phone: "",
    averageMonthlyBill: "1000",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageState>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setMessage(null);
  }

  function validate(): boolean {
    const newErrors = validateQuoteForm(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const billValue = useMemo(() => {
    const raw = form.averageMonthlyBill.trim();
    if (raw === "") return null;
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : null;
  }, [form.averageMonthlyBill]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        phone: form.phone.trim() || undefined,
        averageMonthlyBill: billValue!,
      };

      const quote = await createQuote(payload);

      setMessage({
        type: "ok",
        text: `Submitted — estimated savings: ${quote.estimatedSavings}`,
      });

      setForm((s) => ({
        ...s,
        name: "",
        email: "",
        address: "",
        phone: "",
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      const serverMsg =
        err?.response?.data?.message || err?.message || "Failed to submit";
      setMessage({ type: "err", text: serverMsg });
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setForm({
      name: "",
      email: "",
      address: "",
      phone: "",
      averageMonthlyBill: "1000",
    });
    setErrors({});
    setMessage(null);
  }

  return {
    form,
    errors,
    loading,
    message,
    billValue,
    update,
    handleSubmit,
    reset,
  };
}
