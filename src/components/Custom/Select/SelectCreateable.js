/* eslint-disable */
import { useState, useCallback } from "react";
import AsyncCreateableSelect from "react-select/async-creatable";

import { selectConfig, debounce } from "./configs";
import { LoadingState } from "../Loading";

export const SelectCreateable = ({
  name,
  option,
  placeholder,
  error,
  defaultValue,
  isMulti,
  isDisabled,
  isLoading,
  value,
  onChange,
  onCreateOption,
  ...rest
}) => {
  const options = option ?? [];
  const [isAddingInProgress, setIsAddingInProgress] = useState(false);

  const filterOptions = (inputValue) => {
    return option.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      console.log(inputValue);
      setTimeout(() => {
        resolve(Boolean(inputValue) ? filterOptions(inputValue) : option);
      }, 500);
    });

  const addNewOption = async inputValue => {
    await debounce(1000);

    const newOption = { label: inputValue, value: inputValue };
    options.push(newOption);

    return newOption;
  };

  // 1. Handle Create New Option 
  const defaultOnCreateOptions = useCallback(async (inputValue) => {
    setIsAddingInProgress(true);

    const newOption = await addNewOption(inputValue);

    onChange((prev) => [...prev, newOption]);
    setIsAddingInProgress(false);
  }, []);

  return (
    isLoading
      ? <LoadingState size={20} />
      : <AsyncCreateableSelect
        cacheOptions
        defaultOptions
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        loadOptions={promiseOptions}
        onCreateOption={onCreateOption ?? defaultOnCreateOptions}
        isMulti={isMulti}
        isLoading={isAddingInProgress}
        classNamePrefix={error ? "react-select-invalid" : "react-select"}
        noOptionsMessage={() => "No Data"}
        {...rest}
        {...selectConfig}
      />
  );
};