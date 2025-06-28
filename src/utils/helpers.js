import { keyframes } from "@emotion/react";

const getLineColor = (row, normalColor = 'textSecondary') => {
    if (row?.isExpense)
        return ((row?.amount > 1000 && row?.type === 'cup') ||
            (row?.amount > 100 && row?.type === 'mlc')) ? 'error' : normalColor

    return 'success'
};

const typeList = [
    { _id: 'cup', name: 'CUP' },
    { _id: 'mlc', name: 'MLC' },
    { _id: 'usd', name: 'USD' },
    { _id: 'usdt', name: 'USDT' }
]

const profileInformation = {
    name: 'David Rios Peña',
    email: 'drios9107@gmail.com',
    emailLink: 'mailto:drios9107@gmail.com',
    whatsapp: 'https://wa.me/+5354056199',
    phone: '+53 54056199',
    linkedin: 'https://www.linkedin.com/in/david-rios-9492001b2/',
}

const publicRoutes = [
    '/',
    '/contact',
    '/login',
]
const policyRoutes = [
    '/privacy',
    '/cookies',
    '/terms'
]

const adminRoutes = [
    '/user',
    '/role'
]

const completeAdminRoutes = adminRoutes.map(i => [`/en${i}`, `/es${i}`, i]).flat();

let combinedPublicRoutes = [...publicRoutes, ...policyRoutes].map(i => [`/en${i}`, `/es${i}`, i]);
let policyRoutesWithLanguage = policyRoutes.map(i => [`/en${i}`, `/es${i}`, i]).flat();
combinedPublicRoutes.push(['/en', '/es']);
combinedPublicRoutes = combinedPublicRoutes.flat();

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

const riseAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export { typeList, getLineColor, publicRoutes, policyRoutes, policyRoutesWithLanguage, combinedPublicRoutes, fadeInStyles, riseAnimation, profileInformation, completeAdminRoutes }