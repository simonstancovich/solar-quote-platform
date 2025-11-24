import QuoteForm from "./components/QuoteForm";

export default function Landing() {
  return (
    <div
      style={{ padding: 20, maxWidth: 760, margin: "0 auto", color: "#333" }}
    >
      <h1>Solar Quote — Minimal Form</h1>
      <QuoteForm />
    </div>
  );
}
