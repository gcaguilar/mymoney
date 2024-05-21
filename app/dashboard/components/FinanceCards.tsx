import FinanceCard from "./FinanceCard";

export const FinanceCards = () => (
  <div className="flex flex-1 flex-row items-center gap-2">
    <div className="flex-1">
      <FinanceCard title="Gastado en Enero" amount="1000" currency="$" />
    </div>
    <div className="flex-1">
      <FinanceCard
        title="Diferencia entre ultimo mes"
        amount="10"
        currency="$"
      />
    </div>
  </div>
);
