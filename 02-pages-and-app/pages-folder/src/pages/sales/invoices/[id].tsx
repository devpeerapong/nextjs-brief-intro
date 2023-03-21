import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { Invoice, sdk } from "sdk";
import { getLayout as SalesGetLayout } from "../index";
import { getLayout as InvoicesGetLayout } from "./index";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function InvoicePage({ data }: Props) {
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

  if (!data) {
    return (
      <div className="hero">
        <Head>
          <title>Not Found</title>
        </Head>
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
      <Head>
        <title>
          {amountFormatter.format(data.amount)} {data.customerName} - Invoices
        </title>
      </Head>
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

export const getServerSideProps: GetServerSideProps<
  { data: Invoice; invoices: Invoice[] },
  { id: string }
> = async (ctx) => {
  const [data, invoices] = await Promise.all([
    sdk.invoices.find({ id: ctx.params!.id }),
    sdk.invoices.list(),
  ]);

  if (!data) {
    throw new Error("Not found");
  }

  return {
    props: {
      data,
      invoices,
    },
  };
};

InvoicePage.getLayout = (page: ReactNode, props: Props) =>
  SalesGetLayout(InvoicesGetLayout(page, { data: props.invoices }));
