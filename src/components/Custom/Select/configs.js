/* eslint-disable*/

export const selectConfig = {
  theme: (theme) => ({
    ...theme,
    colors: { ...theme.colors, neutral50: "#c9ced7" }
  }),
  styles: {
    control: (base) => ({
      ...base,
      padding: "3px 6px",
      minHeight: 28,
      borderRadius: 8,
      fontSize: 14,
      color: "#eff0f2",
    }),
    valueContainer: (base) => ({
      ...base,
      paddingLeft: 5,
      margin: 0,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 0,
      paddingLeft: 5,
      paddingRight: 5,
    }),
    menu: (base) => ({ ...base, fontSize: 13 }),
  }
};

export const debounce = ms => new Promise(resolve => setTimeout(() => resolve(), ms));

// export const loadOptions = async (search, prevOptions) => {
//   let filteredOptions;

//   if (!search) {
//     filteredOptions = options;
//   } else {
//     const searchLower = search.toLowerCase();
//     filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(searchLower));
//   }

//   const hasMore = filteredOptions.length > prevOptions.length + 25;
//   const slicedOptions = filteredOptions.slice(prevOptions.length, prevOptions.length + 25);

//   return { options: slicedOptions, hasMore };
// };