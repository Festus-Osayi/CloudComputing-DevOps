export const dateFormatter = (date) => (
    new Date(date).toLocaleString().replaceAll('/', '-')
)