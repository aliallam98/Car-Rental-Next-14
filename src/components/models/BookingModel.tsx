"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Textarea } from "../ui/textarea";
import { createBooking } from "@/actions/booking.actions";
import { toast } from "sonner";

const formSchema = z.object({
  carNameAndModel: z.string().min(1),
  fullName: z.string().min(2, {
    message: "name required",
  }),
  mobilePhone: z.string().min(2, {
    message: "Phone Required",
  }),
  specialRequest: z.string(),
  rentalStartDate: z.date().min(new Date(), {
    message: "start date required",
  }),
  rentalEndDate: z.date().min(new Date(), {
    message: "start date required",
  }),
  carId: z.string(),
});

interface IProps {
  carNameAndModel: string;
  children: React.ReactNode;
  carId: string;
}
const BookingModel = ({ children, carNameAndModel, carId }: IProps) => {
  const [isRendered, setIsRendered] = useState(false);
  const [isPending, startTransition] = useTransition();
  const closeModelRef = useRef<HTMLButtonElement| null>(null);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        fullName: "",
        mobilePhone: "",
      specialRequest: "",
      rentalStartDate: new Date(),
      rentalEndDate: new Date(),
      carNameAndModel,
      carId,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    startTransition(async () => {
      const res = await createBooking(values);
      if (res.success) {
        toast.success("Your Request Has Sent .");
        form.reset();
        closeModelRef?.current?.click();
      }else{
        toast.success("Something went wrong");
      }
    });
  }

  if (!isRendered) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogClose ref={closeModelRef} />
      <DialogContent className="max-w-2xl pt-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
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
                    <Input placeholder="Mobile Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialRequest"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Special Request"
                      className="resize-none"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
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
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModel;
