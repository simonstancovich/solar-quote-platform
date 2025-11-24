import { useQuoteForm } from "../hooks/useQuoteForm";

function SavingsCalculator({ bill }: { bill: number | null }) {
  const estimated = bill === null ? null : +(bill * 0.3).toFixed(2);

  return (
    <div
      style={{
        background: "#fff",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        marginBottom: 16,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Savings calculation</h2>
      <p style={{ fontSize: 14, color: "#555" }}>
        Based on your average monthly bill, this is a rough estimate of your
        monthly savings with solar (using a 30% savings factor).
      </p>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 13, color: "#777" }}>Average monthly bill</div>
        <div style={{ fontWeight: 600 }}>{bill === null ? "—" : bill}</div>
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 13, color: "#777" }}>
          Estimated monthly savings
        </div>
        <div style={{ fontWeight: 600 }}>
          {estimated === null ? "—" : estimated}
        </div>
      </div>

      {bill !== null && estimated !== null && bill > 0 && (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              height: 12,
              borderRadius: 999,
              background: "#eee",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.min((estimated / bill) * 100, 100)}%`,
                background: "#0b74ff",
              }}
            />
          </div>
          <div style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
            Savings ≈ {Math.round((estimated / bill) * 100)}% of your bill
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuoteForm() {
  const {
    form,
    errors,
    loading,
    message,
    billValue,
    update,
    handleSubmit,
    reset,
  } = useQuoteForm();

  return (
    <>
      <SavingsCalculator bill={billValue} />

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        }}
      >
        {/* Name */}
        <label style={{ display: "block", marginBottom: 6 }}>Name</label>
        <input
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: `1px solid ${errors.name ? "crimson" : "#ddd"}`,
          }}
        />
        {errors.name && (
          <div style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
            {errors.name}
          </div>
        )}

        {/* Email */}
        <label style={{ display: "block", marginTop: 12, marginBottom: 6 }}>
          Email
        </label>
        <input
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: `1px solid ${errors.email ? "crimson" : "#ddd"}`,
          }}
        />
        {errors.email && (
          <div style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
            {errors.email}
          </div>
        )}

        {/* Address */}
        <label style={{ display: "block", marginTop: 12, marginBottom: 6 }}>
          Address
        </label>
        <input
          placeholder="123 Main Street"
          value={form.address}
          onChange={(e) => update("address", e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: `1px solid ${errors.address ? "crimson" : "#ddd"}`,
          }}
        />
        {errors.address && (
          <div style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
            {errors.address}
          </div>
        )}

        {/* Phone */}
        <label style={{ display: "block", marginTop: 12, marginBottom: 6 }}>
          Phone (optional)
        </label>
        <input
          placeholder="070 123 45 67"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: `1px solid ${errors.phone ? "crimson" : "#ddd"}`,
          }}
        />
        {errors.phone && (
          <div style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
            {errors.phone}
          </div>
        )}

        {/* Bill */}
        <label style={{ display: "block", marginTop: 12, marginBottom: 6 }}>
          Average monthly bill
        </label>
        <input
          type="number"
          placeholder="1000"
          value={form.averageMonthlyBill}
          onChange={(e) => update("averageMonthlyBill", e.target.value)}
          min={0}
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: `1px solid ${
              errors.averageMonthlyBill ? "crimson" : "#ddd"
            }`,
          }}
        />
        {errors.averageMonthlyBill && (
          <div style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
            {errors.averageMonthlyBill}
          </div>
        )}

        {/* Actions */}
        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "none",
              background: "#0b74ff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {loading ? "Sending..." : "Send Quote"}
          </button>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "1px solid #ccc",
              background: "#f7f7f7",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        {/* Global message */}
        {message && (
          <div
            style={{
              marginTop: 12,
              color: message.type === "err" ? "crimson" : "green",
            }}
          >
            {message.text}
          </div>
        )}
      </form>
    </>
  );
}
