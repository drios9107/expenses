
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

const fadeInStyles = (initialScale = 0.95, delay = 1) => ({
    opacity: 0,
    transform: `scale(${initialScale})`,
    animation: `fadeIn ${delay}s ease-out forwards`,

    '@keyframes fadeIn': {
        from: {
            opacity: 0,
            transform: `scale(${initialScale})`
        },
        to: {
            opacity: 1,
            transform: 'scale(1)'
        }
    }
})

export { getLineColor, publicRoutes, policyRoutes, combinedPublicRoutes, fadeInStyles }