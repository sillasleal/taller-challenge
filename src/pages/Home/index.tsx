import { useEffect, useState } from "react";
import { simulateApi } from "../../utils/api";
import { Payment } from "../../types/payment";

type FilterDate = {
  start: Date | null;
  end: Date | null;
};

const Home = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState<FilterDate>({
    start: null,
    end: null,
  });
  const [error, setError] = useState<string | undefined>();

  const onChangeStartFilter = (value: string) => {
    setFilter((filter) => ({
      ...filter,
      start: new Date(value),
    }));
  };
  const onChangeEndFilter = (value: string) => {
    setFilter((filter) => ({
      ...filter,
      end: new Date(value),
    }));
  };
  const clearFilter = () =>
    setFilter({
      start: null,
      end: null,
    });

  useEffect(() => {
    simulateApi()
      .then((data) => {
        if (filter.start && filter.end) {
          const list = data.filter((payment) => {
            const date = new Date(payment.date);
            return date >= filter.start && date <= filter.end;
          });
          setPayments(list);
        } else {
          setPayments(data);
        }
      })
      .catch((error) => {
        setError(error);
      });
  }, [filter]);

  return (
    <div>
      <h1>Paymenst</h1>
      <div>
        <h3>Filter</h3>
        <input
          type="date"
          onChange={(e) => onChangeStartFilter(e.target.value)}
          placeholder="Start"
        />
        <input
          type="date"
          onChange={(e) => onChangeEndFilter(e.target.value)}
          placeholder="End"
        />
        <button onClick={clearFilter}>Clear</button>
      </div>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <div>
          {payments.map((payment) => (
            <div key={payment.id}>
              <label>{payment.id}</label> -<label>{payment.date}</label> -
              <label>{payment.description}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
