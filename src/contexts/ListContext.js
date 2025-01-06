import { createContext, useState } from "react";

const defaultProvider = {
  categories: [],
  setCategories: () => [],
  recurrentTransactions: [],
  setRecurrentTransactions: () => [],
  subCategories: [],
  setSubCategories: () => [],
  transactions: [],
  setTransactions: () => [],
};

const ListContext = createContext(defaultProvider);

const ListProvider = ({ children }) => {
  const [categories, setCategories] = useState(defaultProvider.categories);
  const [recurrentTransactions, setRecurrentTransactions] = useState(defaultProvider.recurrentTransactions);
  const [subCategories, setSubCategories] = useState(defaultProvider.subCategories);
  const [transactions, setTransactions] = useState(defaultProvider.transactions);

  const values = {
    categories,
    setCategories,
    recurrentTransactions,
    setRecurrentTransactions,
    subCategories,
    setSubCategories,
    transactions,
    setTransactions,
  };

  return (
    <ListContext.Provider value={values}>{children}</ListContext.Provider>
  );
};

export { ListContext, ListProvider };
