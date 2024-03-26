import { getBookingById } from "@/actions/booking.actions";
import { formatDateTime } from "@/lib/utils";
import { notFound } from "next/navigation";
import BookingForm from "../../../_components/forms/BookingForm";

interface IProps {
  params: { id: string };
}
const CarEditPage = async ({ params: { id } }: IProps) => {
  const res = await getBookingById(id);
  const booking = res.results;

  if (!res.success) {
    return notFound();
  }

  return (
    <BookingForm method="Update" data={booking}/>
  );
};

export default CarEditPage;
