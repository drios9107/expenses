import { CategoryContext } from "@/contexts/CategoryContext";
import { DashboardContext } from "@/contexts/DashboardContext";
import { SubCategoryContext } from "@/contexts/SubCategoryContext";
import { TransactionContext } from "@/contexts/TransactionContext";
import { RecurrentTransactionContext } from "@/contexts/RecurrentTransactionContext";
import { useContext } from "react";

const useCategory = () => useContext(CategoryContext);
const useSubCategory = () => useContext(SubCategoryContext);
const useTransaction = () => useContext(TransactionContext);
const useRecurrentTransaction = () => useContext(RecurrentTransactionContext);
const useDashboard = () => useContext(DashboardContext);


export { useCategory, useSubCategory, useRecurrentTransaction, useTransaction, useDashboard };