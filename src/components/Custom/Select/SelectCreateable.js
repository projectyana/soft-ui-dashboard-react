/* eslint-disable */
import { useState, useCallback, useEffect } from "react";
import { withAsyncPaginate } from "react-select-async-paginate";

import Creatable from "react-select/creatable";

import { selectConfig, debounce } from "./configs";

const increaseUniq = (uniq) => uniq + 1;
const CreatableAsyncPaginate = withAsyncPaginate(Creatable);

export const SelectCreateable = ({
  name,
  option,
  placeholder,
  error,
  defaultValue,
  isDisabled
}) => {
  const options = option ?? [];
  const [cacheUniq, setCacheUniq] = useState(0);
  const [isAddingInProgress, setIsAddingInProgress] = useState(false);
  const [value, onChange] = useState([]);

  const loadOptions = async (search, prevOptions) => {
    let filteredOptions;

    if (!search) {
      filteredOptions = options;
    }
    else {
      const searchLower = search.toLowerCase();
      filteredOptions = options.filter(({ label }) => label.toLowerCase().includes(searchLower));
    }

    const hasMore = filteredOptions.length > prevOptions.length + 20;
    const slicedOptions = filteredOptions.slice(prevOptions.length, prevOptions.length + 25);

    return { options: slicedOptions, hasMore };
  };

  // 2. API Call (Create new option)
  const addNewOption = async inputValue => {
    await debounce(1000);

    const newOption = {
      label: inputValue,
      value: inputValue
    };

    options.push(newOption);

    return newOption;
  };

  // 1. Handle Create New Option 
  const onCreateOption = useCallback(async (inputValue) => {
    setIsAddingInProgress(true);

    const newOption = await addNewOption(inputValue);

    setIsAddingInProgress(false);
    setCacheUniq(increaseUniq);
    onChange((prev) => [...prev, newOption]);
  }, []);

  return (
    <CreatableAsyncPaginate
      isMulti
      name={name}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      isDisabled={Boolean(isAddingInProgress) || Boolean(isDisabled)}
      loadOptions={loadOptions}
      classNamePrefix={error ? "react-select-invalid" : "react-select"}
      noOptionsMessage={() => "No Data"}
      SelectComponent={Creatable}
      onCreateOption={onCreateOption}
      cacheUniqs={[cacheUniq]}
      {...selectConfig}
    />
  );
};