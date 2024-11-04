export const dateFormatter = (date) => {
    const dates = new Date(date)
    return Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(dates)
}

export const formatPrice = (price) => (Intl.NumberFormat('en-US', { style: 'currency', currency: 'CAD' }).format(price))
