import { createContext, useContext, useReducer, useEffect } from "react";

const TransactionContext = createContext();

const initialTransactions = [
  { id: "1", date: "2024-03-01", amount: 2500, category: "Salary", type: "income", name: "Tech Corp Inc." },
  { id: "2", date: "2024-03-05", amount: 120, category: "Groceries", type: "expense", name: "Whole Foods" },
  { id: "3", date: "2024-03-10", amount: 60, category: "Transport", type: "expense", name: "Uber" },
  { id: "4", date: "2024-03-15", amount: 350, category: "Utilities", type: "expense", name: "Electric Bill" },
  { id: "5", date: "2024-03-20", amount: 1500, category: "Freelance", type: "income", name: "Client A" },
];

function transactionReducer(state, action) {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return action.payload;
    case "ADD_TRANSACTION":
      return [action.payload, ...state];
    case "EDIT_TRANSACTION":
      return state.map(t => (t.id === action.payload.id ? action.payload : t));
    case "DELETE_TRANSACTION":
      return state.filter(t => t.id !== action.payload);
    default:
      return state;
  }
}

export function TransactionProvider({ children }) {
  const [transactions, dispatch] = useReducer(
    transactionReducer,
    [],
    () => {
      const stored = localStorage.getItem("app_transactions");
      return stored ? JSON.parse(stored) : initialTransactions;
    }
  );

  useEffect(() => {
    localStorage.setItem("app_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    dispatch({ type: "ADD_TRANSACTION", payload: { ...transaction, id: crypto.randomUUID() } });
  };

  const editTransaction = (transaction) => {
    dispatch({ type: "EDIT_TRANSACTION", payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, editTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within a TransactionProvider");
  }
  return context;
}
