import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { sdk, Scientist } from "sdk";

export default function Name({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
  { data: Scientist },
  { name: string }
> = async (ctx) => {
  const name = ctx.params?.name;

  if (!name) {
    throw new Error("Name is required");
  }

  const data = await sdk.find({ name });

  if (!data) {
    throw new Error("Scientist not found");
  }

  return {
    props: { data },
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
