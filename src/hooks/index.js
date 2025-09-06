import { DashboardContext } from "@/contexts/DashboardContext";
import { useContext } from "react";
import useSearch from "./useSearch";
import useCategory from "./useCategory";
import useSubCategory from "./useSubCategory";
import useRecurrentTransaction from "./useRecurrentTransaction";
import useTransaction from "./useTransaction";
import useDashboard from "./useDashboard";
import useMessages from "./useMessages";
import useCurrencies from "./useCurrencies";
import useUser from "./useUser";
import useRole from "./useRole";
import usePerson from "./usePerson";
import useDefaultTransactionValue from "./useDefaultTransactionValue";
import { ListContext } from "@/contexts/ListContext";

const useList = () => useContext(ListContext);
const useDashboardContext = () => useContext(DashboardContext);

export {
    useDefaultTransactionValue,
    useCategory,
    useSubCategory,
    useRecurrentTransaction,
    useTransaction,
    useDashboard,
    useDashboardContext,
    useList,
    useSearch,
    useMessages,
    useCurrencies,
    useUser,
    useRole,
    usePerson,
};
