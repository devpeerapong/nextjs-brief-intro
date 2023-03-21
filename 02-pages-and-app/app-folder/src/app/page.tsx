import { Metadata } from "next";

export const metadata: Metadata = {
  title: "App Router Demo",
  description: "with nested layout",
};

export default async function AppPage() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">App Router Demo</h1>
          <p className="py-6">with Nested Layout</p>
        </div>
      </div>
    </div>
  );
}
