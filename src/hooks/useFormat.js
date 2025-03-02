import moment from "moment";
import { useCallback } from "react";

export const useFormat = () => {

    /**
     * Converts the timestamp to format 'DD MMM YYYY' (01 Feb 2020)
     * @param date {date} Date to be formatted (Any moment input)
     * 
     * @returns formatted string
     */
    const dateFormat1 = useCallback((date) => {
        return moment(date).format("DD MMM YYYY")
    }, []);

    /**
     * Converts the timestamp to format 'YYYY-MM-DD HH:MM' (2020-02-08 10:25)
     * @param date {date} Date to be formatted (Any moment input)
     * 
     * @returns formatted string
     */
    const dateFormat2 = useCallback((date) => {
        return moment(date).format("YYYY-MM-DD HH:mm")
    }, []);

    /**
     * Converts the timestamp to format 'YYYY-MM-DD' (2020-02-08)
     * @param date {date} Date to be formatted (Any moment input)
     * 
     * @returns formatted string
     */
    const dateFormat3 = useCallback((date) => {
        return moment(date).format("YYYY-MM-DD")
    }, []);

    /**
     * Converts the number to format 'x,xxx.xx' (1,804.00)
     * @param number {number} Value to be formatted
     * 
     * @returns formatted number
     */
    const currencyFormat = useCallback((number) => {
        return new Intl.NumberFormat("en-US", {
            currency: "USD",
        }).format(number);
    }, []);

    return { dateFormat1, dateFormat2, dateFormat3, currencyFormat }
}
