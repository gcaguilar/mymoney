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
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Concept</td>
              <td>Amount</td>
              <td>Date</td>
              <td>Category</td>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    required
                    type="text"
                    name="concept"
                    defaultValue={item.concept}
                  />
                </td>
                <td>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    required
                    type="number"
                    name="amount"
                    defaultValue={item.amount}
                  />
                </td>
                <td>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    required
                    type="date"
                    name="date"
                    defaultValue={item.date}
                  />
                </td>
                <td>
                  <input
                    className="input input-bordered w-full max-w-xs"
                    required
                    name="type"
                    type="text"
                    defaultValue={item.type}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="btn btn-active">Guardar</button>
        <button className="btn btn-accent">Eliminar</button>
      </div>
    </>
  );
}

export default ImportedFile;
