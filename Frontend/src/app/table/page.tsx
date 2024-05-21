import { getBooking } from "@/app/Utils/bookingFormActions";
import Link from "next/link";
import { format } from "date-fns";
import { addHoursToTimeString } from "@/app/Utils/helpers";
type BookingList = {
  id: number;
  name: string;
  date: string;
  start_time: string;
  hours: string;
};

async function Table() {
  const data: Array<BookingList> = await getBooking();
  return (
    <div className="flex flex-col justify-center items-cetner w-4/5 h-4/5">
      <div className="flex justify-center items-cetner w-full h-80 overflow-y-scroll overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs uppercase sticky top-0 bg-black text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3">
                End Time
              </th>
              <th scope="col" className="px-6 py-3">
                Hours
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data?.length > 0 &&
              data.map((booking) => (
                <tr className="border-b" key={booking.id}>
                  <td className="px-6 py-4">{booking.name}</td>
                  <td className="px-6 py-4">
                    {format(booking.date?.split("T")[0], "dd-MM-yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    {booking.date.slice(11).slice(0, 5)}
                  </td>
                  <td className="px-6 py-4">
                    {addHoursToTimeString(
                      booking.date.slice(11).slice(0, 5),
                      Number(booking.hours)
                    )}
                  </td>
                  <td className="px-6 py-4">{booking.hours} hours</td>
                </tr>
              ))}
          </tbody>
        </table>
        {!data?.length && (
          <div className="absolute inset-0 flex justify-center items-center">
            <span className="text-gray-500">No Booking found</span>
          </div>
        )}
      </div>
      <Link
        className="mx-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4 cursor-pointer z-10"
        href="/booking"
      >
        Book Your Time Slot Now
      </Link>
    </div>
  );
}

export default Table;
