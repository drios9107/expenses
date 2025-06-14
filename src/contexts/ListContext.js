import { createContext, useState } from "react";

const defaultProvider = {
  users: [],
  setUsers: () => [],
  categories: [],
  setCategories: () => [],
  recurrentTransactions: [],
  setRecurrentTransactions: () => [],
  subCategories: [],
  setSubCategories: () => [],
  transactions: [],
  setTransactions: () => [],
  currentMonthTransactions: [],
  setCurrentMonthTransactions: () => [],
};

const ListContext = createContext(defaultProvider);

const ListProvider = ({ children }) => {
  const [users, setUsers] = useState(defaultProvider.users);
  const [categories, setCategories] = useState(defaultProvider.categories);
  const [recurrentTransactions, setRecurrentTransactions] = useState(defaultProvider.recurrentTransactions);
  const [subCategories, setSubCategories] = useState(defaultProvider.subCategories);
  const [transactions, setTransactions] = useState(defaultProvider.transactions);
  const [currentMonthTransactions, setCurrentMonthTransactions] = useState(defaultProvider.currentMonthTransactions);

  const values = {
    users,
    setUsers,
    categories,
    setCategories,
    recurrentTransactions,
    setRecurrentTransactions,
    subCategories,
    setSubCategories,
    transactions,
    setTransactions,
    currentMonthTransactions,
    setCurrentMonthTransactions,
  };

  return (
    <ListContext.Provider value={values}>{children}</ListContext.Provider>
  );
};

export { ListContext, ListProvider };
