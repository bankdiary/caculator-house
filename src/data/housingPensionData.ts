export const PENSION_AGES = [55, 60, 65, 70, 75, 80] as const;
export type PensionAge = (typeof PENSION_AGES)[number];

export const PROPERTY_PRICES_EOK = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type PropertyPriceEok = (typeof PROPERTY_PRICES_EOK)[number];

interface AgeRateConfig {
  /** 월지급금 기준 단가 (주택가격 1억 원당 만원) */
  perEokManWon: number;
  /** 총대출한도 6억 원 상한 적용 시 최대 월지급금 (만원, null이면 12억까지 상한 미도달) */
  capManWon: number | null;
}

/**
 * 한국주택금융공사 공식 월지급금 예시표 기준 (일반주택 · 종신지급방식 · 정액형)
 * 공식 공시 3억 / 6억 / 9억 / 12억 수치 기반
 */
const AGE_RATE_TABLE: Record<PensionAge, AgeRateConfig> = {
  55: { perEokManWon: 15.6, capManWon: null },
  60: { perEokManWon: 21.0667, capManWon: null },
  65: { perEokManWon: 25.2833, capManWon: null },
  70: { perEokManWon: 30.7833, capManWon: 341.4 },
  75: { perEokManWon: 38.1167, capManWon: 366.6 },
  80: { perEokManWon: 48.3167, capManWon: 406.0 },
};

export interface PayoutDetail {
  age: PensionAge;
  priceEok: number;
  /** 원 단위 정밀 월지급금 환산 (만원 소수점 1자리) */
  exactMonthlyManWon: number;
  /** 표시용 반올림 월지급금 (만원 정수) */
  monthlyManWon: number;
  /** 연간 수령액 (만원) */
  annualManWon: number;
  /** 초기보증료 1% 기준 (만원) */
  initialFeeManWon: number;
  /** 집값 1억당 월지급액 (만원, 소수점 1자리) */
  perEokDisplay: string;
  /** 단순 손익분기 소요 연수 */
  breakEvenYears: number;
  /** 손익분기 도달 나이 */
  breakEvenAge: number;
  /** 총대출한도 상한 적용 여부 */
  isCapped: boolean;
}

export function getExactMonthlyManWon(age: PensionAge, priceEok: number): {
  exactMonthlyManWon: number;
  isCapped: boolean;
} {
  const config = AGE_RATE_TABLE[age];
  const uncapped = config.perEokManWon * priceEok;

  if (config.capManWon !== null && uncapped >= config.capManWon) {
    return {
      exactMonthlyManWon: Number(config.capManWon.toFixed(1)),
      isCapped: true,
    };
  }

  return {
    exactMonthlyManWon: Number(uncapped.toFixed(1)),
    isCapped: false,
  };
}

export function calculatePensionSummary(age: PensionAge, priceEok: number): PayoutDetail {
  const { exactMonthlyManWon, isCapped } = getExactMonthlyManWon(age, priceEok);
  const monthlyManWon = Math.round(exactMonthlyManWon);
  const annualManWon = monthlyManWon * 12;
  const initialFeeManWon = Math.round(priceEok * 10000 * 0.01);
  const totalPriceManWon = priceEok * 10000;
  const breakEvenYears = Math.round(totalPriceManWon / annualManWon);
  const breakEvenAge = age + breakEvenYears;
  const perEokDisplay = (exactMonthlyManWon / priceEok).toFixed(1);

  return {
    age,
    priceEok,
    exactMonthlyManWon,
    monthlyManWon,
    annualManWon,
    initialFeeManWon,
    perEokDisplay,
    breakEvenYears,
    breakEvenAge,
    isCapped,
  };
}

export interface FiveYearComparison {
  fromAge: PensionAge;
  toAge: PensionAge;
  monthlyDiffManWon: number;
  annualDiffManWon: number;
  isMaxAgeFallback: boolean;
}

export function getFiveYearComparison(age: PensionAge, priceEok: number): FiveYearComparison {
  if (age < 80) {
    const nextAge = (age + 5) as PensionAge;
    const current = calculatePensionSummary(age, priceEok);
    const next = calculatePensionSummary(nextAge, priceEok);
    const monthlyDiffManWon = next.monthlyManWon - current.monthlyManWon;

    return {
      fromAge: age,
      toAge: nextAge,
      monthlyDiffManWon,
      annualDiffManWon: monthlyDiffManWon * 12,
      isMaxAgeFallback: false,
    };
  }

  const prevAge = 75 as PensionAge;
  const prev = calculatePensionSummary(prevAge, priceEok);
  const current = calculatePensionSummary(age, priceEok);
  const monthlyDiffManWon = current.monthlyManWon - prev.monthlyManWon;

  return {
    fromAge: prevAge,
    toAge: age,
    monthlyDiffManWon,
    annualDiffManWon: monthlyDiffManWon * 12,
    isMaxAgeFallback: true,
  };
}
