import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales - Overview",
  description: "Overview Page",
};

export default function SalesPage() {
  return <h1 className="text-5xl p-8 text-center">Overview Page</h1>;
}
