"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { ICar } from "@/typings";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
// import CategorySelect from "@/components/CategorySelect";
// import BrandSelect from "@/components/BrandSelect";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FileState, MultiImageDropzone } from "../MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { createCar } from "@/actions/car.actions";
import { useState, useTransition } from "react";
import CategorySelect from "../CategorySelect";
import BrandSelect from "../BrandSelect";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }).max(50),
  description: z.string().max(500).optional(),
  imagesUrl: z
    .array(z.string().url({ message: "Invalid image URL" }))
    .min(1, { message: "At least one image is required" }),
  modelYear: z.number().min(1900, "Year must be after 1900"),
  seater: z.number().min(1, "Seater count must be positive"),
  powerHorse: z.number().min(1, "Horsepower must be positive"),
  kilometersIncluded: z.number().min(0, "Kilometers must be non-negative"),
  rentalCost: z.number().min(0, "Rental cost must be non-negative"),
  relatedVideo: z.string().url().optional(),
  isOnSale: z.boolean(),
  discountByPercent: z.optional(
    z.number().min(1, "Discount by percent must be non-negative")
  ),
  discountByAmount: z.optional(
    z.number().min(1, "Discount by percent must be non-negative")
  ),
  // categoryId and brandId can be added here if needed (assuming these are references)
  categoryId: z.string().min(1, { message: "Category is required" }),
  brandId: z.string().min(1, { message: "Brand is required" }),
});

interface IProps {
  method: "Create" | "Update";
  data?: ICar;
}

const CreateProductForm = ({ method, data }: IProps) => {
  const [isPending, startTransition] = useTransition();
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const defaultValue = {
    title: "",
    description: "",
    imagesUrl: [],
    modelYear: 0, // Can be adjusted to a more appropriate default value (e.g., 1900)
    seater: 0, // Can be adjusted to a more appropriate default value (e.g., 1)
    powerHorse: 0, // Can be adjusted to a more appropriate default value (e.g., 100)
    kilometersIncluded: 0,
    rentalCost: 0,
    isOnSale: false,
    discountByPercent: 0,
    discountByAmount: 0,
    relatedVideo: "", // Optional
    categoryId: "", // Optional reference
    brandId: "",
  };
  const initValues = data && method == "Update" ? data : defaultValue; //ToDo When Update

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (method === "Create") {
      let productImages: any = [];
      try {
        if (fileStates.length > 0) {
          await Promise.all(
            fileStates.map(async (addedFileState) => {
              const res = await edgestore.publicFiles.upload({
                // @ts-ignore
                file: addedFileState.file,
                onProgressChange: async (progress) => {
                  updateFileProgress(addedFileState.key, progress);
                  if (progress === 100) {
                    // Wait 1 second before setting to COMPLETE
                    // to display 100% progress bar
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    updateFileProgress(addedFileState.key, "COMPLETE");
                  }
                },
              });
              productImages.push(res.url);
            })
          );
          values.imagesUrl = productImages;
          // const event = startTransition(async () => {
          //   await createCar(values, userId);
          // });
          toast.success("Event Has Created");
          // router.push(event?.results._id);
        }
      } catch (err) {
        toast.error("Error during Create Event:");
        console.log(err);
      }
    }

    if (method === "Update") {
      console.log("Update", values);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-y-6 mx-auto max-w-3xl w-full p-4 py-10 rounded-3xl   "
      >
        <h2 className="font-semibold text-3xl lg:text-4xl text-center mb-10">
          {method === "Create" ? "Create" : "Update"} Car
        </h2>

        {/* name */}
        <FormField
          control={form.control}
          name="title"
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

        <FormField
          control={form.control}
          name="imagesUrl"
          render={({ field }) => (
            <FormItem className="flex justify-center">
              <FormControl>
                <MultiImageDropzone
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
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        {/* Categories - ... - Brands */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Select */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CategorySelect
                    onChangeHandler={field.onChange}
                    value={field.value}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          {/* brand Select */}
          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <BrandSelect
                    onChangeHandler={field.onChange}
                    value={field.value!}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>

        {/* Price Input IsOnSale SalePercent - SaleAmount */}
        <div className="relative flex flex-col mt-4 ">
          <div className="flex items-center">
            <FormField
              control={form.control}
              name="rentalCost"
              render={({ field }) => (
                <FormItem className="relative grow mt-0">
                  <Label className="absolute -top-4">Rental Cost</Label>
                  <FormControl>
                    <Input
                      placeholder="price"
                      {...field}
                      className=""
                      disabled={isPending}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>

                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isOnSale"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0 h-full px-4 w-fit">
                  <FormLabel>Is On Sale ?</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {form.getValues("isOnSale") && (
            <div className="flex items-center gap-4 mt-4">
              <FormField
                control={form.control}
                name="discountByPercent"
                render={({ field }) => (
                  <FormItem className="relative grow mt-0">
                    <Label className="">Discount Percent</Label>
                    <FormControl>
                      <Input
                        placeholder="Discount Percent"
                        {...field}
                        className=""
                        disabled={isPending}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>

                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountByAmount"
                render={({ field }) => (
                  <FormItem className="relative grow mt-0">
                    <Label className="">Discount Amount</Label>
                    <FormControl>
                      <Input
                        placeholder="Discount Amount"
                        {...field}
                        className=""
                        disabled={isPending}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>

                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="modelYear"
          render={({ field }) => (
            <FormItem className="relative grow mt-0">
              <Label className="absolute -top-4">Model Year</Label>
              <FormControl>
                <Input
                  placeholder="Model Year"
                  {...field}
                  className=""
                  disabled={isPending}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="powerHorse"
          render={({ field }) => (
            <FormItem className="relative grow mt-0">
              <Label className="absolute -top-4">Power House</Label>
              <FormControl>
                <Input
                  placeholder="Power Horse"
                  {...field}
                  className=""
                  disabled={isPending}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="seater"
          render={({ field }) => (
            <FormItem className="relative grow mt-0">
              <Label className="absolute -top-4">Seaters</Label>
              <FormControl>
                <Input
                  placeholder="Seater"
                  {...field}
                  className=""
                  disabled={isPending}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="kilometersIncluded"
          render={({ field }) => (
            <FormItem className="relative grow mt-0">
              <Label className="absolute -top-4">Kilometers Included</Label>
              <FormControl>
                <Input
                  placeholder="price"
                  {...field}
                  className=""
                  disabled={isPending}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relatedVideo"
          render={({ field }) => (
            <FormItem className="relative grow mt-0">
              <Label className="absolute -top-4">Related Video Link</Label>
              <FormControl>
                <Input
                  placeholder="Related Video Link"
                  {...field}
                  className=""
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

export default CreateProductForm;
