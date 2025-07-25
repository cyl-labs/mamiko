"use client";

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";

export default function ProductsFilter({ name, filters, setFilters }) {
  const [checked, setChecked] = useState(false);

  function addFilter(isChecked) {
    setChecked(isChecked);

    if (isChecked) {
      if (!filters.includes(name)) setFilters([...filters, name]);
    } else {
      setFilters(filters.filter((filter) => filter !== name));
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Checkbox
        checked={checked}
        onCheckedChange={addFilter}
        className="w-5 h-5 border-[#4065DD] data-[state=checked]:bg-[#4065DD] data-[state=checked]:border-[#4065DD] hover:cursor-pointer"
      />
      <h3 className="text-lg">{name}</h3>
    </div>
  );
}
