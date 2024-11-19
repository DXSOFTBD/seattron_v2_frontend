import React, { useState } from 'react';
import Select, { StylesConfig } from 'react-select';

interface Option {
  value: string;
  label: string;
}

export const Dropdown = ({
  data,
  width,
  border,
  borderBottom,
  borderRadius,
  setFieldValue,
  placeholder,
  name,
  height,
  fontSize,
  marginLeft,
}: any) => {
  //Customize css for dropdown

  const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      margin: 0,
      width: width ? width : 350,
      height: height ? height : 36,
      minHeight: height ? height : 36,
      fontSize: fontSize ? fontSize : '14px',
      border: border ? border : '1px solid #d1d5db',
      borderBottom: borderBottom ? borderBottom : '',
      borderRadius: borderRadius ? borderRadius : '',
      marginLeft: marginLeft ? marginLeft : '',
    }),
  };
  const modelOptions: Option[] =
    data?.map((model: any) => ({
      label: model.name,
      value: model._id,
      ...model,
    })) || [];
  const [state, setState] = useState();
  const handleDataChange = (selectedOption: any) => {
    setState(selectedOption);
    console.log(selectedOption);
    setFieldValue(selectedOption);
  };
  // console.log(value);
  return (
    <div className='text-black'>
      <Select<Option>
        styles={customStyles}
        options={modelOptions}
        name={name}
        onChange={handleDataChange}
        placeholder={placeholder}
      />
    </div>
  );
};
