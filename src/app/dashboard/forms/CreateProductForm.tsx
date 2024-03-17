import { z } from "zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";

import { ElementRef, useRef, useState } from "react";

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

import { cn, convertFileToUrl } from "@/lib/utils";
import { IProduct } from "@/typings";
// import axios from "axios";
// import { useQueryClient } from "react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import CategorySelect from "@/components/CategorySelect";
import SubCategorySelect from "@/components/SubCategorySelect";
import BrandSelect from "@/components/BrandSelect";
import { Label } from "@/components/ui/label";
import ColorSelect from "@/components/ColorSelect";
import SizesSelect from "@/components/SizesSelect";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2, { message: "name is required" }).max(50),
  description: z.string().max(500).optional(),
  stock: z.number().min(1, "Stock is required").positive().int(),
  price: z.number().min(1, "Price is required").positive().int(),
  colors: z.array(
    z.object({
      label: z.string(),
      color: z.string(),
      value: z.string(),
    })
  ),
  sizes: z.array(
    z.object({
      label: z.string(),
      value: z.any(),
    })
  ),
  isOnSale: z.boolean(),
  discountByPercent: z.number(z.number().positive()).optional(),
  discountByAmount: z.number(z.number().positive()).optional(),
  images: z.array(z.any()),
  categoryId: z.string().min(1, { message: "category is required" }),
  subCategoryId: z.string().optional(),
  brandId: z.string().optional(),
});

interface IProps {
  method: "Create" | "Update";
  data?: IProduct;
}

const CreateProductForm = ({ method, data }: IProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const [files, setFiles] = useState<File[] | null>([]);
  const [fileError, setFileError] = useState("");
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  // const useQuery = useQueryClient();

  const fileRef = useRef<ElementRef<"input">>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    if (selectedFiles.length > 6) {
      toast.error("Maximum Images Is 6 ");
      return;
    }

    try {
      const newImagesPreview = (await Promise.all(
        Array.from(selectedFiles).map(async (file) => {
          if (!file.type.startsWith("image")) {
            setFileError("Invalid file type. Only images are allowed.");
            return;
          }
          const url = await convertFileToUrl(file);
          return url;
        })
      )) as string[];
      setImagesPreview([...imagesPreview, ...newImagesPreview]);
      setFiles([...(files ?? []), ...selectedFiles]);
    } catch (error) {
      console.error("Error uploading files:", error);
      setFileError("An error occurred while uploading files.");
    }
  };

  const removeImage = (index: number) => {
    setImagesPreview((prevImages) => prevImages?.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles?.filter((_, i) => i !== index) ?? []);
  };
  // console.log(files);
  // console.log(imagesPreview);

  const defaultValue = {
    name: "",
    description: "",
    stock: 1,
    price: 0,
    colors: [],
    sizes: [],
    isOnSale: false,
    discountByPercent: 0,
    discountByAmount: 0,
    images: [],
    categoryId: "",
    brandId: "",
    subCategory: "",
  };
  const initValues =
    data && method == "Update" ? { name: data?.name } : defaultValue; //ToDo When Update

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (method === "Create") {
      // if (!files?.length) {
      //   return setFileError("Should has 1 image at least");
      // }

      delete values.brandId;
      delete values.subCategoryId;

      const formData = new FormData();

      // if (files && files.length > 0) {
      //   for (const file of files) {
      //     formData.append("images", file);
      //   }
      // }

      // const colorArray = values.colors.map((color) => ({
      //   label: color.label,
      //   color: color.color,
      //   value: color.value,
      // }));
      // const sizeArray = values.sizes.map((size) => ({
      //   label: size.label,
      //   value: size.value,
      // }));


      // formData.append("colors", JSON.stringify(colorArray)) // here
      // formData.append("sizes",JSON.stringify(values.sizes)); // here

      // Append other non-image fields directly
      for (const [key, value] of Object.entries(values)) {
        if (key !== "images") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formData.append(key, value as any);
        }
      }

      setIsPending(true);

      // console.log(formData.get("colors"));
      // console.log(formData.get("sizes"));

      // console.log(formData);

      axios
        .post("/api/product", values,{
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => toast.success(res.data.message))
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => setIsPending(false));
    }

    if (method === "Update") {
      console.log("Update");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-y-6 mx-auto max-w-3xl w-full p-4 py-20 rounded-3xl   "
      >
        <h2 className="font-semibold text-3xl lg:text-4xl text-center mb-10">
          {method === "Create" ? "Create" : "Update"} Product
        </h2>

        {/* name */}
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

        {/* Categories - Sub ... - Brands */}
        <div className="flex items-center justify-between">
          {/* Category Select */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
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
          {/* subCategory Select */}
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SubCategorySelect
                    onChangeHandler={field.onChange}
                    value={field.value!}
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
              <FormItem>
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
              name="price"
              render={({ field }) => (
                <FormItem className="relative grow mt-0">
                  <Label className="absolute -top-4">Price Per Unit</Label>
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
        {/* stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <Label>Stock</Label>
              <FormControl>
                <Input
                  placeholder="Stock Amount"
                  {...field}
                  className="bg-transparent border-neutral-400"
                  disabled={isPending}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* colors */}
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <Label>Colors</Label>
              <FormControl>
                <ColorSelect
                  onChangeHandler={field.onChange}
                  value={field.value}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />
        {/* sizes */}
        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <Label>Sizes</Label>
              <FormControl>
                <SizesSelect
                  onChangeHandler={field.onChange}
                  value={field.value}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        {/* File */}
        <div>
          <div className="flex gap-2 justify-center py-5">
            {files?.length !== 6 && (
              <div className="relative w-[150px] h-[150px]  border rounded-md flex justify-center items-center  bg-cover bg-no-repeat bg-center">
                <Button
                  onClick={() => fileRef?.current?.click()}
                  type="button"
                  variant={"ghost"}
                  size={"sm"}
                >
                  Upload Images
                </Button>
                <Input
                  multiple
                  ref={fileRef}
                  className="absolute w-full h-full hidden"
                  disabled={isPending}
                  placeholder="File"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            )}
            {imagesPreview?.map((item, i) => (
              <div
                key={i}
                className="relative w-[150px] h-[150px] border rounded-md  bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${item || ""})` }}
              >
                <Button
                  className={cn(
                    "absolute top-1 right-1 h-fit p-2 hidden hover:bg-transparent ",
                    item && "block"
                  )}
                  type="button"
                  variant={"ghost"}
                  onClick={() => removeImage(i)}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>
          <p
            className={cn(
              "hidden text-sm font-semibold text-red-600",
              fileError.length > 0 && "block"
            )}
          >
            {fileError}
          </p>
        </div>

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
