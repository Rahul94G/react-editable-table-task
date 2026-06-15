function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Laura', 'Robert', 'Olivia'];
const lastNames = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Taylor'];

function generateName(): string {
  return `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`;
}

function generateEmail(name: string): string {
  const normalized = name.toLowerCase().replace(/\s+/g, '.');
  const domains = ['example.com', 'mail.com', 'test.org', 'demo.net'];
  return `${normalized}@${getRandomElement(domains)}`;
}

export interface MockRow {
  id: number;
  name: string;
  email: string;
  salary: number;
  quantity: number;
}

export function generateMockData(count: number): MockRow[] {
  const data: MockRow[] = [];
  for (let i = 1; i <= count; i++) {
    const name = generateName();
    data.push({
      id: i,
      name,
      email: generateEmail(name),
      salary: Math.round(Math.random() * 90000 + 10000), // 10k‑100k
      quantity: Math.floor(Math.random() * 1000),
    });
  }
  return data;
}
