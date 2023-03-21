import Link from "next/link";
import { sdk, Scientist } from "sdk";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {data.map((item) => (
        <div key={item.name} className="hero">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <Link
                href={item.name}
                className="text-5xl font-bold text-blue-600 hover:text-blue-800 cursor-pointer hover:scale-105 transition-transform"
              >
                {item.name}
              </Link>
              <p className="text-sm text-slate-700">
                {item.activeYears} · {item.countryOfOrigin}
              </p>
              <p className="py-6">{item.biggestAchievement}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: Scientist[];
}> = async () => {
  const data = await sdk.list();

  return {
    props: { data },
  };
};
