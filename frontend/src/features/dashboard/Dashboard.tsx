import { useEffect, useState } from "react";
import { getQuotes, type Quote } from "../../api/quotes";

export default function Dashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await getQuotes();
      setQuotes(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load quotes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Quote dashboard</h2>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && quotes.length === 0 && <p>No quotes yet.</p>}

      {!loading && !error && quotes.length > 0 && (
        <table
          border={1}
          cellPadding={6}
          style={{ borderCollapse: "collapse", width: "100%", marginTop: 12 }}
        >
          <thead>
            <tr>
              <th>Created</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Bill</th>
              <th>Savings</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id}>
                <td>{new Date(q.createdAt).toLocaleString()}</td>
                <td>{q.name}</td>
                <td>{q.email}</td>
                <td>{q.address}</td>
                <td>{q.phone || "—"}</td>
                <td>{q.averageMonthlyBill}</td>
                <td>{q.estimatedSavings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
