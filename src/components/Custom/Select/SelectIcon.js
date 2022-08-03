/* eslint-disable */
import { useState, useEffect } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Select } from "./Select";
import { LoadingState } from "../Loading";

export const SelectIcon = ({
  defaultValue,
  value,
  onChange,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);

  const iconList = Object.keys(Icons).filter(key => key !== 'fas' && key !== 'prefix').map(icon => ({
    ...Icons[icon],
    value: `fas fa-${Icons[icon].iconName}`,
    label: Icons[icon].iconName
  }));

  library.add(...iconList);

  console.log(value);
  console.log(iconList.find(icon => icon.value === value));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);

    }, 1000);

    return () => { };
  }, []);

  const getDef = (defaultValue) => {
    const test = defaultValue ? iconList.find(icon => icon.value === defaultValue) : null;
    if (test) {
      const def = { value: test.value, label: <span> <FontAwesomeIcon icon={test.value} size="xs" /> - {test.label} </span> };
      console.log(def);
      return def;
    }
    return null;
  };

  return (
    loading
      ? <LoadingState />
      : <Select
        defaultOptions
        option={iconList}
        defaultValue={defaultValue ? getDef(defaultValue) : null}
        value={value}
        onChange={onChange}
        getOptionLabel={(option) => <span> <FontAwesomeIcon icon={option.value} size="xs" /> - {option.label} </span>}
        // formatOptionLabel={(option) => <span> <FontAwesomeIcon icon={option.value} size="xs" /> - {option.label} </span>}
        {...rest}
      />
  );
};