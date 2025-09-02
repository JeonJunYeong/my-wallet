interface CurrencyTextProps {
  amount: number; // 금액
  currency?: string; // 통화 단위 (예: '원', '$', 'USD')
}

export const CurrencyText = ({
  amount,
  currency = "원",
}: CurrencyTextProps) => {
  // 3자리마다 콤마 처리
  const formattedAmount = amount.toLocaleString();

  return (
    <div>
      <div className="p-2 float-right">
        <span className="text-3xl font-semibold">{formattedAmount}</span>
        <span className="ml-1 font-semibold">{currency}</span>
      </div>
    </div>
  );
};
