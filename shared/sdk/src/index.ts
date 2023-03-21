export type Scientist = {
  name: string;
  activeYears: string;
  biggestAchievement: string;
  countryOfOrigin: string;
};

export type Work = {
  title: string;
  description: string;
  year: string;
};

export type Invoice = {
  id: string;
  customerName: string;
  amount: number;
  dueDate: string;
  issuedDate: string;
  lineItems: { description: string; price: number }[];
};

async function list() {
  const response = await fetch("http://localhost:4000/scientists");
  const json = await response.json();

  return json as Scientist[];
}

async function find({ name }: { name: string }) {
  const data = await list();

  return data.find((item) => item.name === name);
}

async function works(): Promise<Work[]>;
async function works({ name }: { name: string }): Promise<Work[] | undefined>;
async function works({ name }: { name?: string } = {}) {
  const response = await fetch("http://localhost:4000/works");
  const json = await response.json();

  if (!name) {
    return Object.values(json).flat() as Work[];
  }

  return json[name] as Work[] | undefined;
}

async function findWork({ title }: { title: string }) {
  const data = await works();

  return data.find((item) => item.title === title);
}

export const sdk = {
  list,
  find,
  works,
  findWork,
  invoices: {
    async list() {
      const response = await fetch("http://localhost:4000/invoices");
      const json = await response.json();

      return json as Invoice[];
    },
    async find({ id }: { id: string }) {
      const invoices = await this.list();

      return invoices.find((item) => item.id === id);
    },
  },
};
