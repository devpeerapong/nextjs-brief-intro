export type Scientist = {
  name: string;
  activeYears: string;
  biggestAchievement: string;
  countryOfOrigin: string;
};

async function list() {
  const response = await fetch("http://localhost:4000/scientists");
  const json = await response.json();

  return json as Scientist[];
}

async function find({
  name,
}: {
  name: string;
}): Promise<Scientist | undefined> {
  const data = await list();

  return data.find((item) => item.name === name);
}

export const sdk = {
  list,
  find,
};
