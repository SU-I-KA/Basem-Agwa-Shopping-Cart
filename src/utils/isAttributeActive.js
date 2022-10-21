export const isAttributeActive = (attribute, selectedAttributes) => {
   return Boolean(
      selectedAttributes?.find?.(
         (item) =>
            item?.name === attribute?.name && item?.value === attribute?.value
      )
   )
}
