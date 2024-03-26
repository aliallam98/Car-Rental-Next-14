"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { useTransition } from "react";

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

import { Textarea } from "@/components/ui/textarea";
import { createBooking, updateBooking } from "@/actions/booking.actions";

import DatePicker from "react-datepicker";
import { IBooking } from "@/typings";

import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from "@/components/Spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { redirect } from "next/navigation";

interface IProps {
  method: "Create" | "Update";
  data?: IBooking;
}

const BookingForm = ({ method, data }: IProps) => {
  const [isPending, startTransition] = useTransition();

  const formSchema = z.object({
    fullName: z
      .string()
      .min(2, {
        message: "name is required",
      })
      .max(50),
    mobilePhone: z.string().min(2, {
      message: "Phone Required",
    }),
    specialRequest: z.optional(z.string()),
    rentalStartDate: z.date().min(new Date(), {
      message: "start date required",
    }),
    rentalEndDate: z.date().min(new Date(), {
      message: "start date required",
    }),
    carNameAndModel: z.optional(z.string()),
    // carId: z.string(),
    status: z.boolean(),
  });

  const defaultValues = {
    fullName: data?.fullName || "",
    mobilePhone: data?.mobilePhone || "",
    specialRequest: data?.specialRequest || "",
    rentalStartDate: data?.rentalStartDate
      ? new Date(data?.rentalStartDate)
      : new Date(),
    rentalEndDate: data?.rentalEndDate
      ? new Date(data?.rentalEndDate)
      : new Date(),
    carNameAndModel: data?.carNameAndModel || "",
    // carId: data?.carId || "",
    status: data?.status === "Received" ? true : false,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (method === "Create") {
      startTransition(async () => {
        const res = await createBooking(values);
        if (res.success) {
          toast.success("Order Has Added . ");
          form.reset()
          redirect("/dashboard/orders")
        } else toast.error(res.message);
      });
    }
    if (method === "Update") {
      startTransition(async () => {
        const res = await updateBooking(values, data?._id!);
        if (res.success) {
          toast.success(res.message);
        } else toast.error(res.message);
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
          Order Page (Update)
        </h2>

        <FormField
          control={form.control}
          name="fullName"
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
        <FormField
          control={form.control}
          name="mobilePhone"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Phone Number"
                  {...field}
                  className="bg-transparent border-neutral-400"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carNameAndModel"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Car Details"
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
          name="specialRequest"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="specialRequest"
                  className="resize-none"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="absolute" />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-6 md:flex-row items-center justify-between">
          <FormField
            control={form.control}
            name="rentalStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Start Date Time</FormLabel>
                {/* <CalendarIcon  size={18} className="relative left-48 top-[37px] z-50 text-muted-foreground"/> */}
                <FormControl>
                  <DatePicker
                    className="border rounded-md p-2 outline-none w-full"
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={new Date()}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rentalEndDate"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>End Date Time</FormLabel>
                {/* <CalendarIcon  size={18} className="relative left-48 top-[37px] z-50 text-muted-foreground"/> */}
                <FormControl>
                  <DatePicker
                    className="border rounded-md p-2 outline-none w-full"
                    selected={field.value}
                    onChange={field.onChange}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={new Date()}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="absolute" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 ">
              <FormLabel className="!m-0">Status:</FormLabel>
              <FormControl>
                <Checkbox
                  className="w-5 h-5"
                  checked={field.value}
                  onCheckedChange={field.onChange}
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
          className="w-full  transition space-x-2"
        >
          {method === "Create" ? "Create" : "Update"}{" "}
          {isPending && <Spinner size={"sm"} />}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
