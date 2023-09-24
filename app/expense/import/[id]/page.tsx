interface Expense {
  concept: string;
  amount: number;
  date: string;
  type: string;
}

async function fetchData(id: string) {
  const response = await fetch(`http://localhost:3000/api/temporal/${id}`);
  const data = await response.json();
  const expenseData: Expense[] = data.expense;

  return expenseData;
}

async function ImportedFile({ params }: { params: { id: string } }) {
  const data = await fetchData(params.id);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Concept</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.concept}</td>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ImportedFile;
