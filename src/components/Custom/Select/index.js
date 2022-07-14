/* eslint-disable */
import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import SuiTypography from "components/SuiTypography";

const Select = ({
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
    const slicedOptions = filteredOptions.slice(
      prevOptions.length,
      prevOptions.length + 25
    );

    return {
      options: slicedOptions,
      hasMore
    };
  };

  return (
    <div className="mb-2">
      <small style={{ textTransform: "capitalize" }}>{label}</small>
      {loading ? (
        <div className="text-secondary text-center">
          <small>Memuat . . .</small>
        </div>
      ) : (
        <>
          <AsyncPaginate
            name={name}
            loadOptions={loadOptions}
            placeholder={placeholder}
            onChange={onChange}
            classNamePrefix={error ? "react-select-invalid" : "react-select"}
            defaultValue={defaultValue}
            noOptionsMessage={() => "No Data"}
            isDisabled={isDisabled}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                neutral50: "#c9ced7"
              }
            })}
            styles={{
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
              menu: (base) => ({
                ...base,
                fontSize: 13,
                // color: "#eff0f2",
              }),
            }}
          />
          <SuiTypography variant="overline" color="error" fontWeight="light">
            {errorMessage}
          </SuiTypography>
        </>
      )}
    </div>
  );
};

export default Select;