import { NavLink } from "@/components/NavLink";
import { sdk } from "sdk";

export default async function InvoicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sdk.invoices.list();
  const dateFormatter = new Intl.DateTimeFormat("en-GB", { year: "numeric" });
  const amountFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });
  const total = data.reduce((memo, item) => memo + item.amount, 0);
  const goal = 50000;
  var haha = 0;

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
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}
