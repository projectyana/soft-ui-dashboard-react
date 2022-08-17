/* eslint-disable */
import { AsyncPaginate } from "react-select-async-paginate";
import SuiTypography from "components/SuiTypography";
import { LoadingState } from "components/Custom/Loading";

import { selectConfig, debounce } from "./configs";

export const Select = ({
  label,
  name,
  placeholder,
  isDisabled,
  defaultValue,
  loading,
  option,
  error,
  errorMessage,
  onChange,
  value,
  getOptionLabel,
  ...rest
}) => {
  const options = option;

  const loadOptions = async (search, prevOptions) => {
    let filteredOptions;

    if (!search) {
      filteredOptions = options;
    } else {
      const searchLower = search.toLowerCase();
      filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(searchLower)
      );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 25;
    const slicedOptions = filteredOptions.slice(prevOptions.length, prevOptions.length + 25);

    return { options: slicedOptions, hasMore };
  };

  return (
    <div className="mb-2">
      <small style={{ textTransform: "capitalize" }}>{label}</small>
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <AsyncPaginate
            name={name}
            loadOptions={loadOptions}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            classNamePrefix={error ? "react-select-invalid" : "react-select"}
            noOptionsMessage={() => "No Data"}
            isDisabled={isDisabled}
            getOptionLabel={getOptionLabel}
            menuPosition="fixed"
            {...rest}
            {...selectConfig}
          />
          <SuiTypography variant="overline" color="error" fontWeight="light">
            {errorMessage}
          </SuiTypography>
        </>
      )}
    </div>
  );
};