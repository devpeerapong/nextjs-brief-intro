import Link from "next/link";
import { sdk } from "sdk";

import { useFetch } from "@/useFetch";

export default function Home() {
  const { data, loading } = useFetch(sdk.list);


  if (loading) {
    return (
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Loading</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {data?.map((item) => (
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
