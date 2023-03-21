import Head from "next/head";

export default function Home() {
  return (
    <div className="hero">
      <Head>
        <title>Pages Demo</title>
        <meta name="description" content="with nested layout"></meta>
      </Head>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Pages Demo</h1>
          <p className="py-6">with Nested Layout</p>
        </div>
      </div>
    </div>
  );
}
