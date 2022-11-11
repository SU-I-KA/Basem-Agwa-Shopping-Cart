const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
   minimumFractionDigits: 2,
   maximumFractionDigits: 2,
})

export function formatCurrency(num) {
   return CURRENCY_FORMATTER.format(num)
}
