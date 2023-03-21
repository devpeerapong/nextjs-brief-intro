import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales - Invoices",
  description: "Invoices Page",
};

export default function InvoicesPage() {
  return (
    <h1 className="text-2xl p-4 text-center">
      Select invoice for more detail.
    </h1>
  );
}
