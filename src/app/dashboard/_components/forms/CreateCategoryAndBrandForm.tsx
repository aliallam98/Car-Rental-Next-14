"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { IBrand, ICategory } from "@/typings";
import { createCategory, updateCategory } from "@/actions/category.actions";
import { createBrand, updateBrand } from "@/actions/brand.actions";
import { Textarea } from "@/components/ui/textarea";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../SingleImageDropzone";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name is required",
    })
    .max(50),
  description: z.optional(
    z
      .string()
      .min(2, {
        message: "name is required",
      })
      .max(50)
  ),

  imageUrl: z.any(),
});

interface IProps {
  type: "Category" | "Brand";
  method: "Create" | "Update";
  data?: ICategory | IBrand;
}

const CreateCategoryAndBrandForm = ({ type, method, data }: IProps) => {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const defaultValue = { name: "", description: "" };
  const initValues =
    data && method == "Update" ? { name: data?.name } : defaultValue;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (type === "Category" && method === "Create") {
      if (!file) {
        return form.setError("imageUrl", {
          message: "Image is required",
        });
      } else {
        form.setError("imageUrl", {
          message: "",
        });
      }
      startTransition(async () => {
        if (file) {
          const res = await edgestore.publicFiles.upload({
            file,
          });
          values.imageUrl = res.url;
        }
        // await createCategory();
      });
    }
    if (type === "Category" && method === "Update") {
      startTransition(async () => {
        await updateCategory();
      });
    }
    if (type === "Brand" && method === "Create") {
      if (!file) {
        return form.setError("imageUrl", {
          message: "Image is required",
        });
      } else {
        form.setError("imageUrl", {
          message: "",
        });
      }
      startTransition(async () => {
        if (file) {
          const res = await edgestore.publicFiles.upload({
            file,
          });
          values.imageUrl = res.url;
        }
        // await createBrand();
      });
    }
    if (type === "Brand" && method === "Update") {
      startTransition(async () => {
        await updateBrand();
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-y-6 mx-auto max-w-md w-full p-4 py-20 rounded-3xl   "
      >
        <h2 className="font-semibold text-3xl lg:text-4xl text-center mb-10">
          {method === "Create" ? "Create" : "Update"} {type}
        </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter Name"
                  {...field}
                  className="bg-transparent border-neutral-400"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description Textarea */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        {/* File */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <SingleImageDropzone
                  {...field}
                  width={200}
                  height={200}
                  value={file}
                  onChange={(file) => {
                    setFile(file);
                  }}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type="submit"
          className="w-full  transition"
        >
          {method === "Create" ? "Create" : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCategoryAndBrandForm;

{
  /* <MultiImageDropzone
                  className="h-[50px] w-[50px]  sm:h-[80px] sm:w-[80px] md:h-[150px] md:w-[150px] "
                  {...field}
                  value={fileStates}
                  dropzoneOptions={{
                    maxFiles: 6,
                  }}
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                  disabled={isPending}
                /> */
}
