"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getAllCategories } from "@/actions/category.actions";
import { ICategory } from "@/typings";
import { useEffect, useState } from "react";

const CategorySelect =  ({ value, onChangeHandler }: any) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  console.log(value);

  useEffect(() => {
    const getCategories = async () => {
      await getAllCategories().then((res) =>
        setCategories(res)
      );
    };


    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value._id}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0
          ? categories?.map((c: ICategory) => (
              <SelectItem key={c._id} value={`${c._id}`}>
                {c.name}
              </SelectItem>
            ))
          : "No Results"}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
