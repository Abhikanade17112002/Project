import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";

import { useState } from "react";


const FilterCard = ({ filtersarray ,query , setQuery}) => {
  const [selectedValue, setSelectedValue] = useState("");
  console.log('====================================');
  console.log(selectedValue);
  console.log('====================================');
  const changeHandler = (value) => {
    setSelectedValue(value);
    setQuery(value);
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-md">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filtersarray.map((data, index) => (
          <div>
            <h1 className="font-bold text-sm">{data.label}</h1>
            {data.value.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label className="text-sm" htmlFor={itemId}>
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
