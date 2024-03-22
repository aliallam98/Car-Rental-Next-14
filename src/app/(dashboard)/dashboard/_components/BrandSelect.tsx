"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IBrand, ICategory } from "@/typings";
import { getAllBrands } from "@/actions/brand.actions";
import { useEffect, useState } from "react";

const BrandSelect = ({ value, onChangeHandler }: any) => {
  const [brands, setBrands] = useState<IBrand[]>([]);

  useEffect(() => {
    const getBrands = async () => {
      await getAllBrands().then((res) => setBrands(res));
    };

    getBrands();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value._id}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Brand" />
      </SelectTrigger>
      <SelectContent>
        {brands.length > 0
          ? brands?.map((c: ICategory) => (
              <SelectItem key={c._id} value={`${c._id}`}>
                {c.name}
              </SelectItem>
            ))
          : "No Results"}
      </SelectContent>
    </Select>
  );
};

export default BrandSelect;
