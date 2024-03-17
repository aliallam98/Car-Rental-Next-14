import { z } from "zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ElementRef, useRef, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn, convertFileToUrl } from "@/lib/utils";
import { IBrand, ICategory, ISubCategory } from "@/typings";
import axios from "axios";
import { useQueryClient } from "react-query";
import CategorySelect from "@/components/CategorySelect";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name is required",
    })
    .max(50),
  categoryId: z.string(),
  image: z.any(),
});

interface IProps {
  type: "Category" | "SubCategory" | "Brand";
  method: "Create" | "Update";
  data?: ICategory | ISubCategory | IBrand;
}

const CreateCategorySubBrandForm = ({ type, method, data }: IProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>();
  const [fileError, setFileError] = useState("");

  const useQuery = useQueryClient();

  const fileRef = useRef<ElementRef<"input">>(null);
  let imagePreview =
    file && file.type.startsWith("image") && convertFileToUrl(file);

  const defaultValue = { name: "", image: {}, categoryId: "" };
  const initValues =
    data && method == "Update" ? { name: data?.name } : defaultValue;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (method === "Create") {
      if (!file) return setFileError("Image Is Required");
      if (file && !file?.type.startsWith("image")) {
        return setFileError("Only image files are allowed");
      }
      if (file && file?.size > 10 * 1024 * 1024) {
        return setFileError("image must be a maximum of 10MB");
      }
    }
    if (method === "Update") {
      if (file && !file?.type.startsWith("image")) {
        return setFileError("Only image files are allowed");
      }
      if (file && file?.size > 10 * 1024 * 1024) {
        return setFileError("image must be a maximum of 10MB");
      }
    }

    if (type === "Category" && method === "Create") {
       form.setValue("image", file);
      setIsPending(true);
      const formData = new FormData();
       formData.append("name", values.name);
       formData.append("image", file as File);

      axios
        .post(`/api/category/`, formData)
        .then((res) => {
          toast.success(res.data.message);
          form.reset();
          setFile(null);
        })
        .catch((error) => {
          console.log(error);

          toast.error(error.response.data.message);
        })
        .finally(() => setIsPending(false));
    }
    if (type === "Category" && method === "Update") {
      setIsPending(true);
      const formData = new FormData();
      if (file) {
        form.setValue("image", file);
        formData.append("image", file as File);
      }
      formData.append("name", values.name);
      await axios
        .put(`/api/category/${data?._id}`, formData)
        .then(async (res) => {
          toast.success(res.data.message);
          await useQuery.invalidateQueries({
            queryKey: ["Category", data?._id],
          });
          form.reset();
          setFile(null);
        })
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => setIsPending(false));
    }
    if (type === "SubCategory" && method === "Create") {
      form.setValue("image", file);
      setIsPending(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", file as File);
      formData.append("categoryId", values.categoryId);
      await axios
        .post(`/api/sub-category`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success(res.data.message);
          form.reset();
          setFile(null);
        })
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => setIsPending(false));
    }
    if (type === "SubCategory" && method === "Update") {
      form.setValue("image", file);
      setIsPending(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", file as File);
      await axios
        .put(`/api/sub-category/${data?._id}`, formData)
        .then((res) => {
          toast.success(res.data.message);
          form.reset();
          setFile(null);
        })
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => setIsPending(false));
    }
    if (type === "Brand" && method === "Create") {
      form.setValue("image", file);
      setIsPending(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", file as File);
      await axios
        .post(`/api/brand`, formData)
        .then((res) => {
          toast.success(res.data.message);
          form.reset();
          setFile(null);
        })
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => setIsPending(false));
    }
    if (type === "Brand" && method === "Update") {
      setIsPending(true);
      const formData = new FormData();
      if (file) {
        form.setValue("image", file);
        formData.append("image", file as File);
      }
      formData.append("name", values.name);
      await axios
        .put(`/api/brand/${data?._id}`, formData)
        .then(async (res) => {
          toast.success(res.data.message);
          await useQuery.invalidateQueries({
            queryKey: ["Brand", data?._id],
          });
          form.reset();
          setFile(null);
        })
        .catch((error) => toast.error(error.response.data.message))
        .finally(() => setIsPending(false));
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

        {type === "SubCategory" && (
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
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div
          className="relative w-[250px] h-[250px] mx-auto border rounded-md flex justify-center items-center  bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${imagePreview || ""})` }}
        >
          <Button
            className={cn(imagePreview && "hidden")}
            onClick={() => fileRef?.current?.click()}
            type="button"
            variant={"ghost"}
            size={"sm"}
          >
            Upload Image
          </Button>
          <Input
            ref={fileRef}
            className="absolute w-full h-full hidden"
            disabled={isPending}
            placeholder="File"
            type="file"
            onChange={(e) => {
              setFile(e.target?.files?.[0]);
              setFileError("");
            }}
          />
          <Button
            className={cn(
              "absolute top-1 right-1 h-fit p-2 hidden hover:bg-transparent z-50",
              imagePreview && "block"
            )}
            type="button"
            variant={"ghost"}
            onClick={() => {
              setFile(null);
              imagePreview = "";
            }}
          >
            <X />
          </Button>
        </div>

        <p
          className={cn(
            "hidden text-sm font-semibold text-red-600",
            fileError.length > 0 && "block"
          )}
        >
          {fileError}
        </p>

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

export default CreateCategorySubBrandForm;
