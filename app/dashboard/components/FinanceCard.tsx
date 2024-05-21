import React from "react";

interface ExpenseCardProps {
  title: string;
  amount: string;
  currency: string;
}

const FinanceCard: React.FC<ExpenseCardProps> = ({
  title,
  amount,
  currency,
}) => {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
      </div>
      <div className="p-6 space-y-0 text-2xl font-bold pb-6">
        {currency}
        {amount}
      </div>
    </div>
  );
};

export default FinanceCard;
