import { NavLink } from "@/components/NavLink";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { sdk } from "sdk";
import { getLayout as SalesGetLayout } from "../index";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Invoices() {
  return (
    <>
      <Head>
        <title>Sales - Invoices</title>
        <meta name="description" content="Invoices Page" />
      </Head>
      <h1 className="text-2xl p-4 text-center">
        Select invoice for more detail.
      </h1>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Awaited<ReturnType<typeof sdk.invoices.list>>;
}> = async () => {
  const data = await sdk.invoices.list();

  return {
    props: {
      data,
    },
  };
};

export function getLayout(page: ReactNode, { data }: Props) {
  const dateFormatter = new Intl.DateTimeFormat("en-GB", { year: "numeric" });
  const amountFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });
  const total = data.reduce((memo, item) => memo + item.amount, 0);
  const goal = 50000;

  return (
    <div>
      <div className="flex items-center gap-8 py-8">
        <div>
          <h6 className="text-lg text-slate-500 uppercase font-bold">
            Current
          </h6>
          <h4 className="text-2xl">{amountFormatter.format(total)}</h4>
        </div>
        <progress
          className="progress progress-primary w-56 h-4 flex-grow mt-6"
          value={total}
          max={goal}
        ></progress>
        <div>
          <h6 className="text-lg text-slate-500 uppercase font-bold">Goal</h6>
          <h4 className="text-2xl">{amountFormatter.format(goal)}</h4>{" "}
        </div>
      </div>
      <div className="flex rounded border border-base-400">
        <ul className="menu bg-base-100 border-r border-base-400">
          {data.map((item) => (
            <li key={item.id}>
              <NavLink
                href={`/sales/invoices/${item.id}`}
                className="flex gap-4 w-[300px]"
                activeClassName="bg-base-200"
              >
                <span className="flex-grow">
                  <span className="block text-lg font-bold">
                    {item.customerName}
                  </span>
                  <span>{dateFormatter.format(new Date(item.issuedDate))}</span>
                </span>
                <span>{amountFormatter.format(item.amount)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex-grow">{page}</div>
      </div>
    </div>
  );
}

Invoices.getLayout = (page: ReactNode, props: Props) =>
  SalesGetLayout(getLayout(page, props));
