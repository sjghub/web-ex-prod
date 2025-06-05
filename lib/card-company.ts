// Utility functions for card company detection
export interface CardCompanyData {
  prefix: string;
  company: string;
}

export async function loadCardCompanyData(): Promise<CardCompanyData[]> {
  try {
    const res = await fetch('/card_companies.csv');
    const text = await res.text();
    return text
      .trim()
      .split(/\r?\n/)
      .slice(1)
      .map((line) => {
        const [prefix, company] = line.split(',');
        return { prefix, company } as CardCompanyData;
      });
  } catch (e) {
    console.error('Failed to load card company data', e);
    return [];
  }
}

export function detectCardCompany(cardNumber: string, data: CardCompanyData[]): string | null {
  if (cardNumber.length < 6) return null;
  const prefix = cardNumber.slice(0, 6);
  const found = data.find((d) => prefix.startsWith(d.prefix));
  return found ? found.company : null;
}

export function getKoreanCompanyName(company: string): string {
  switch (company.toUpperCase()) {
    case 'HYUNDAI':
      return '현대카드';
    case 'SAMSUNG':
      return '삼성카드';
    case 'WOORI':
      return '우리카드';
    case 'KOOKMIN':
      return '국민카드';
    case 'SHINHAN':
      return '신한카드';
    case 'LOTTE':
      return '롯데카드';
    default:
      return company;
  }
}
