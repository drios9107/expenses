
const getLineColor = (row, normalColor = 'textSecondary') => {
    if (row?.isExpense)
        return ((row?.amount > 1000 && row?.type === 'cup') ||
            (row?.amount > 100 && row?.type === 'mlc')) ? 'error' : normalColor

    return 'success'
};

const publicRoutes = [
    '/login',
]
const policyRoutes = [
    '/privacy',
]

const combinedPublicRoutes = [...publicRoutes, ...policyRoutes].map(i => [`/en${i}`, `/es${i}`, i]).flat();

export { getLineColor, publicRoutes, policyRoutes, combinedPublicRoutes }