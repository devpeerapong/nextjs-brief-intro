import { Metadata } from "next";
import { sdk } from "sdk";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "short",
  day: "numeric",
});
const amountFormatter = new Intl.NumberFormat("en-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await sdk.invoices.find({ id: params.id });

  if (!data) {
    return {
      title: "Not Found - Invoices",
    };
  }

  return {
    title: `${amountFormatter.format(data.amount)} ${
      data.customerName
    } - Invoices`,
  };
}

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const data = await sdk.invoices.find({ id: params.id });

  if (!data) {
    return (
      <div className="hero">
        <div className="hero-content text-center">
          <div className="px-8">
            <h1 className="text-5xl font-bold">Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="font-bold">{data.customerName}</h1>
      <p className="text-5xl text-slate-700 font-bold mb-2">
        {amountFormatter.format(data.amount)}
      </p>
      <p className="mb-4 text-sm text-slate-500">
        Issued Date {dateFormatter.format(new Date(data.issuedDate))}
      </p>
      {data.lineItems.map((item) => (
        <div
          key={`${item.description}${item.price}`}
          className="flex border-b border-base-400 py-4 last:border-b-0"
        >
          <div className="flex-grow">{item.description}</div>
          <div className="w-32">{amountFormatter.format(item.price)}</div>
        </div>
      ))}
    </div>
  );
}
