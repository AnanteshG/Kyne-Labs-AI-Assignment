import Link from "next/link";
import { AppShell } from "@/components/shell/AppShell";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { riskTone } from "@/components/ui/Status";
import { customers } from "@/server/mock-db";
import { formatCurrency } from "@/lib/utils";

export default function CustomersPage() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Customers"
        title="Operational customer context"
        description="Inspect account status, consent, risk, and recommended next actions."
      />
      <Card>
        <CardHeader title="Customers in active portfolio" eyebrow="Embedded and standalone view" />
        <div className="grid gap-4 md:hidden">
          {customers.map((customer) => (
            <Link key={customer.id} href={`/customers/${customer.id}`} className="rounded-xl border border-line p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-blue-700">{customer.name}</p>
                  <p className="mt-2 text-sm text-muted">{customer.segment} · {customer.dpd} DPD · {formatCurrency(customer.balance)}</p>
                </div>
                <Badge tone={riskTone(customer.risk)}>{customer.risk}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={customer.consent === "valid" ? "success" : "warning"}>{customer.consent} consent</Badge>
                <Badge tone={customer.contactable ? "success" : "danger"}>{customer.contactable ? "contactable" : "suppressed"}</Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">{customer.nextBestAction}</p>
            </Link>
          ))}
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-[980px] w-full text-left text-sm">
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
                  <td className="py-5 pr-6"><Link href={`/customers/${customer.id}`} className="font-semibold text-blue-700">{customer.name}</Link></td>
                  <td className="pr-6">{customer.segment}</td>
                  <td className="pr-6">{customer.dpd}</td>
                  <td className="pr-6">{formatCurrency(customer.balance)}</td>
                  <td className="pr-6"><Badge tone={customer.consent === "valid" ? "success" : "warning"}>{customer.consent}</Badge></td>
                  <td className="pr-6"><Badge tone={riskTone(customer.risk)}>{customer.risk}</Badge></td>
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
