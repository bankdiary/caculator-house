import { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import {
  PENSION_AGES,
  PROPERTY_PRICES_EOK,
  calculatePensionSummary,
  getExactMonthlyManWon,
  getFiveYearComparison,
  type PensionAge,
} from '../data/housingPensionData';

function formatNumber(value: number): string {
  return value.toLocaleString('ko-KR');
}

export default function PensionCalculator() {
  const [selectedAge, setSelectedAge] = useState<PensionAge>(60);
  const [priceEok, setPriceEok] = useState<number>(6);
  const [isTableOpen, setIsTableOpen] = useState<boolean>(false);

  const summary = calculatePensionSummary(selectedAge, priceEok);
  const comparison = getFiveYearComparison(selectedAge, priceEok);

  const sliderProgressPercent = ((priceEok - 1) / (12 - 1)) * 100;

  const handleSelectCell = (age: PensionAge, price: number) => {
    setSelectedAge(age);
    setPriceEok(price);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] px-4 py-8 sm:px-6 sm:py-12">
      <main className="mx-auto flex w-full max-w-[680px] flex-col gap-5">
        {/* Top App Download Banner */}
        <section
          aria-label="뱅크다이어리 전문가앱 다운로드"
          className="rounded-2xl border border-slate-200/90 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)] sm:px-6"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src="/assets/aistudio/___18_4x-100_02d3bfcf.jpg"
                alt="뱅크다이어리"
                referrerPolicy="no-referrer"
                className="h-7 w-auto shrink-0 object-contain sm:h-8"
              />
              <span className="inline-flex items-center whitespace-nowrap text-[18px] font-semibold leading-none tracking-tight text-slate-700 sm:text-[19px]">
                전문가앱
              </span>
            </div>
            <span className="whitespace-nowrap shrink-0 text-xs font-medium text-slate-500">
              앱 다운로드
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.appg.bankdiary.expert"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <path
                  d="M3.61 1.814L13.793 12 3.61 22.186a1.48 1.48 0 0 1-.61-1.202V3.016c0-.49.238-.926.61-1.202z"
                  fill="#00D2FF"
                />
                <path
                  d="M17.246 8.547L13.793 12l3.453 3.453 3.903-2.226c.84-.48.84-1.974 0-2.454l-3.903-2.226z"
                  fill="#FFCA28"
                />
                <path
                  d="M17.246 15.453L13.793 12 3.61 22.186c.385.276.905.33 1.425.033l12.211-6.766z"
                  fill="#FF3D00"
                />
                <path
                  d="M17.246 8.547L5.035 1.781c-.52-.297-1.04-.243-1.425.033L13.793 12l3.453-3.453z"
                  fill="#00E676"
                />
              </svg>
              <span>구글플레이</span>
            </a>

            <a
              href="https://apps.apple.com/kr/app/%EB%B1%85%ED%81%AC%EB%8B%A4%EC%9D%B4%EC%96%B4%EB%A6%AC-%EB%B3%B4%ED%97%98-%EC%A0%84%EB%AC%B8%EA%B0%80%EC%9A%A9/id1543640453"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100/80 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <rect width="24" height="24" rx="5.5" fill="#007AFF" />
                <path
                  d="M11.98 6.4l-4.2 7.28M12.02 6.4l4.2 7.28M8.7 12.1h6.6M6.9 15.2l-1.1 1.9M17.1 15.2l1.1 1.9"
                  stroke="#FFFFFF"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>애플스토어</span>
            </a>
          </div>
        </section>

        {/* Header */}
        <header className="flex flex-col items-center pt-1 text-center">
          <div className="flex items-center gap-2.5">
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M4 15.5L16 5L28 15.5V27C28 27.5523 27.5523 28 27 28H5C4.44772 28 4 27.5523 4 27V15.5Z"
                fill="#E2E8F0"
                stroke="#1E3A8A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 16L16 4L29.5 16"
                stroke="#EA580C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="13" y="18" width="6" height="10" rx="1" fill="#2563EB" />
            </svg>
            <h1 className="text-balance text-[26px] font-bold tracking-tight text-[#0d2558] sm:text-[30px]">
              주택연금 월지급금 계산기
            </h1>
          </div>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-2 text-[13px] font-medium text-slate-500 sm:text-sm">
            <span>한국주택금융공사 공식 표 기준</span>
            <span aria-hidden="true">·</span>
            <span>종신지급방식 정액형</span>
            <span aria-hidden="true">·</span>
            <span>일반주택</span>
          </p>
        </header>

        {/* Input Controls Card */}
        <section
          aria-label="가입 조건 설정"
          className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] sm:p-8"
        >
          {/* Age Selector */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                연금 개시 나이
              </label>
              <span className="text-xs text-slate-500">
                부부 중 연소자 만 나이 기준
              </span>
            </div>
            <div
              role="radiogroup"
              aria-label="연금 개시 나이 선택"
              className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-2.5"
            >
              {PENSION_AGES.map((age) => {
                const isActive = selectedAge === age;
                return (
                  <button
                    key={age}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    onClick={() => setSelectedAge(age)}
                    className={`min-h-[44px] whitespace-nowrap shrink-0 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                      isActive
                        ? 'border-blue-600 bg-blue-600 text-white shadow-[0_2px_8px_rgba(37,99,235,0.28)]'
                        : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {age}세
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property Price Slider */}
          <div className="mt-7">
            <div className="flex items-baseline justify-between">
              <label
                htmlFor="property-price-slider"
                className="text-sm font-semibold text-slate-700"
              >
                아파트 시세
              </label>
              {summary.isCapped && (
                <span className="text-xs font-medium text-amber-700">
                  총대출한도 6억 원 상한 적용
                </span>
              )}
            </div>

            <div className="mt-2.5 flex items-baseline gap-1.5">
              <span className="tabular-nums text-[32px] font-bold leading-none tracking-tight text-[#0d2558] sm:text-[36px]">
                {priceEok}억
              </span>
              <span className="text-lg font-medium text-slate-500">원</span>
            </div>

            <div className="mt-4">
              <input
                id="property-price-slider"
                type="range"
                min={1}
                max={12}
                step={1}
                value={priceEok}
                onChange={(e) => setPriceEok(Number(e.target.value))}
                aria-valuemin={1}
                aria-valuemax={12}
                aria-valuenow={priceEok}
                aria-valuetext={`${priceEok}억 원`}
                style={{
                  background: `linear-gradient(to right, #2563eb 0%, #2563eb ${sliderProgressPercent}%, #e2e8f0 ${sliderProgressPercent}%, #e2e8f0 100%)`,
                }}
                className="pension-slider"
              />
            </div>

            <div className="mt-2 flex justify-end">
              <span className="text-[11px] font-medium text-slate-400">
                단위: 억원
              </span>
            </div>

            <div className="mt-1.5 grid grid-cols-12 items-center text-center">
              {PROPERTY_PRICES_EOK.map((price) => {
                const isSelected = priceEok === price;
                return (
                  <button
                    key={price}
                    type="button"
                    onClick={() => setPriceEok(price)}
                    aria-label={`${price}억 원 선택`}
                    className={`tabular-nums min-h-[28px] rounded text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isSelected
                        ? 'font-bold text-blue-600'
                        : 'font-medium text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {price}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Primary Result Card */}
        <section
          aria-label="예상 연금 수령 결과"
          className="rounded-2xl bg-[#0d2558] p-6 text-white shadow-[0_10px_28px_rgba(13,37,88,0.16)] sm:p-8"
        >
          <p className="text-sm font-medium text-[#9cb8eb]">예상 월 지급금</p>

          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="tabular-nums text-[44px] font-bold leading-none tracking-tight text-white sm:text-[52px]">
              {formatNumber(summary.monthlyManWon)}만
            </span>
            <span className="text-xl font-medium text-[#9cb8eb] sm:text-2xl">
              원
            </span>
          </div>

          <p className="mt-3 text-sm font-medium text-slate-200 sm:text-[15px]">
            연간{' '}
            <span className="tabular-nums font-bold text-[#fbbf24]">
              {formatNumber(summary.annualManWon)}만원
            </span>{' '}
            수령
          </p>

          <div className="my-6 border-t border-white/15" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <p className="text-xs font-medium text-[#9cb8eb]">
                초기보증료 (1%)
              </p>
              <p className="tabular-nums mt-1.5 text-lg font-bold tracking-tight text-white">
                {formatNumber(summary.initialFeeManWon)}만원
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#9cb8eb]">단순 손익분기</p>
              <p className="tabular-nums mt-1.5 text-lg font-bold tracking-tight text-white">
                약 {summary.breakEvenYears}년
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#9cb8eb]">
                집값 1억당 월지급
              </p>
              <p className="tabular-nums mt-1.5 text-lg font-bold tracking-tight text-white">
                {summary.perEokDisplay}만원
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-[#9cb8eb]">
                손익분기 도달 나이
              </p>
              <p className="tabular-nums mt-1.5 text-lg font-bold tracking-tight text-white">
                약 {summary.breakEvenAge}세
              </p>
            </div>
          </div>
        </section>

        {/* 5-Year Comparison Callout */}
        <section
          aria-label="가입 연령 비교 안내"
          className="flex flex-col gap-3 rounded-xl border border-amber-200/90 bg-[#fef8e8] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-700 sm:items-center">
            <Lightbulb
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 sm:mt-0"
              aria-hidden="true"
            />
            <p>
              {comparison.isMaxAgeFallback ? (
                <>
                  <strong className="font-bold text-amber-700">
                    최고 연령 기준:
                  </strong>{' '}
                  <span className="tabular-nums font-medium">
                    {comparison.fromAge}세 → {comparison.toAge}세
                  </span>
                  로 가입 시 월{' '}
                  <strong className="tabular-nums font-bold text-amber-700">
                    {formatNumber(comparison.monthlyDiffManWon)}만원
                  </strong>{' '}
                  더 수령, 연{' '}
                  <strong className="tabular-nums font-bold text-amber-700">
                    {formatNumber(comparison.annualDiffManWon)}만원
                  </strong>{' '}
                  차이
                </>
              ) : (
                <>
                  <strong className="font-bold text-amber-700">
                    5년 기다리면?
                  </strong>{' '}
                  <span className="tabular-nums font-medium">
                    {comparison.fromAge}세 → {comparison.toAge}세
                  </span>{' '}
                  가입으로 바꾸면 월{' '}
                  <strong className="tabular-nums font-bold text-amber-700">
                    {formatNumber(comparison.monthlyDiffManWon)}만원
                  </strong>{' '}
                  증가, 연{' '}
                  <strong className="tabular-nums font-bold text-amber-700">
                    {formatNumber(comparison.annualDiffManWon)}만원
                  </strong>{' '}
                  추가 수령
                </>
              )}
            </p>
          </div>

          {!comparison.isMaxAgeFallback && (
            <button
              type="button"
              onClick={() => setSelectedAge(comparison.toAge)}
              className="min-h-[36px] shrink-0 self-end whitespace-nowrap rounded-lg border border-amber-300/90 bg-white px-3 py-1.5 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 sm:self-center"
            >
              {comparison.toAge}세 적용
            </button>
          )}
        </section>

        {/* Expandable Official Matrix Table */}
        <section
          aria-label="공식 월지급금 전체 표"
          className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.03)]"
        >
          <button
            type="button"
            aria-expanded={isTableOpen}
            aria-controls="official-payout-table"
            onClick={() => setIsTableOpen((prev) => !prev)}
            className="flex min-h-[54px] w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-slate-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
          >
            <div className="flex items-center gap-2.5">
              {isTableOpen ? (
                <ChevronUp className="h-4 w-4 text-blue-600" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4 text-blue-600" aria-hidden="true" />
              )}
              <span className="text-sm font-semibold text-blue-600 sm:text-[15px]">
                공식 월지급금 전체 표 보기 (단위: 만원)
              </span>
            </div>
            <span className="hidden text-xs font-medium text-slate-400 sm:inline">
              {isTableOpen ? '접기' : '펼치기'}
            </span>
          </button>

          {isTableOpen && (
            <div
              id="official-payout-table"
              className="border-t border-slate-100 px-4 pb-5 pt-4 sm:px-6"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>표를 클릭하면 해당 나이·시세 조건이 바로 적용됩니다</span>
                <span>* 상한선: 70세 341만 · 75세 367만 · 80세 406만원</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-right text-xs sm:text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2.5 pl-2 pr-3 text-left font-semibold">
                        주택시세
                      </th>
                      {PENSION_AGES.map((age) => (
                        <th
                          key={age}
                          className={`tabular-nums px-2 py-2.5 font-semibold ${
                            selectedAge === age
                              ? 'bg-blue-50/70 text-blue-700'
                              : 'text-slate-600'
                          }`}
                        >
                          {age}세
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PROPERTY_PRICES_EOK.map((price) => {
                      const isRowActive = priceEok === price;
                      return (
                        <tr
                          key={price}
                          className={
                            isRowActive ? 'bg-blue-50/40' : 'hover:bg-slate-50/70'
                          }
                        >
                          <td
                            className={`tabular-nums py-2 pl-2 pr-3 text-left font-semibold ${
                              isRowActive ? 'text-blue-700' : 'text-slate-700'
                            }`}
                          >
                            {price}억 원
                          </td>
                          {PENSION_AGES.map((age) => {
                            const { exactMonthlyManWon } = getExactMonthlyManWon(
                              age,
                              price
                            );
                            const rounded = Math.round(exactMonthlyManWon);
                            const isSelectedCell =
                              selectedAge === age && priceEok === price;
                            const isColActive = selectedAge === age;

                            return (
                              <td
                                key={age}
                                className={`p-1 ${
                                  isColActive && !isSelectedCell
                                    ? 'bg-blue-50/40'
                                    : ''
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleSelectCell(age, price)}
                                  className={`tabular-nums w-full rounded-md px-2 py-1.5 text-right transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                                    isSelectedCell
                                      ? 'bg-blue-600 font-bold text-white shadow-xs'
                                      : 'font-medium text-slate-700 hover:bg-blue-100/70 hover:text-blue-800'
                                  }`}
                                >
                                  {formatNumber(rounded)}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pb-4 pt-2 text-center text-xs leading-relaxed text-slate-400">
          <p>
            출처: 한국주택금융공사 공식 월지급금 예시 (종신지급방식 정액형,
            일반주택)
          </p>
          <p className="mt-0.5">
            실제 지급금은 감정평가액 기준으로 차이가 있을 수 있습니다
          </p>
        </footer>
      </main>
    </div>
  );
}
