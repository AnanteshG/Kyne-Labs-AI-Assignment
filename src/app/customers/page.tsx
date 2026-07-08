import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { riskTone } from "@/components/ui/Status";
import { customers } from "@/server/mock-db";
import { formatCurrency } from "@/lib/utils";

export default function CustomersPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-muted">Customers</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Operational customer context</h1>
      </div>
      <Card>
        <CardHeader title="Customers in active portfolio" eyebrow="Embedded and standalone view" />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="py-3">Customer</th>
                <th>Segment</th>
                <th>DPD</th>
                <th>Balance</th>
                <th>Consent</th>
                <th>Risk</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td className="py-4"><Link href={`/customers/${customer.id}`} className="font-semibold text-blue-700">{customer.name}</Link></td>
                  <td>{customer.segment}</td>
                  <td>{customer.dpd}</td>
                  <td>{formatCurrency(customer.balance)}</td>
                  <td><Badge tone={customer.consent === "valid" ? "success" : "warning"}>{customer.consent}</Badge></td>
                  <td><Badge tone={riskTone(customer.risk)}>{customer.risk}</Badge></td>
                  <td className="text-slate-700">{customer.nextBestAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
