
const getLineColor = (row, normalColor = 'textSecondary') => {
    if (row?.isExpense)
        return row?.amount > 1000 ? 'error' : normalColor

    return 'success'
};


export { getLineColor }