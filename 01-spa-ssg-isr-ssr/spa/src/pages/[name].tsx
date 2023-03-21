import { useFetch } from "@/useFetch";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { sdk } from "sdk";

export default function Name({
  name,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data, loading } = useFetch(
    useCallback(() => sdk.find({ name }), [name])
  );

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

  if (!data) {
    return (
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Not Found</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div key={data.name} className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{data.name}</h1>
          <p className="text-sm text-slate-700">
            {data.activeYears} · {data.countryOfOrigin}
          </p>
          <p className="py-6">{data.biggestAchievement}</p>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<
  { name: string },
  { name: string }
> = (ctx) => {
  if (!ctx.params) {
    throw new Error("No name in route");
  }

  return {
    props: {
      name: ctx.params.name,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await sdk.list();
  const paths = data.map((item) => ({ params: { name: item.name } }));

  return {
    paths,
    fallback: false,
  };
};
