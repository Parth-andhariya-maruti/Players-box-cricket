"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import Header from "@/app/Components/Header";
import Button from "@/app/Components/Button";
import { bookSlot } from "@/app/Utils/bookingFormActions";
import { addHoursToTimeString } from "../Utils/helpers";

export default function ConfirmScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Header />
      <div className="flex flex-col items-center justify-center h-5/12 w-4/12">
        <h1 className="font-bold text-md text-blue-900 mb-2">Verify details</h1>
        <Suspense>
          <Details />
        </Suspense>
      </div>
    </div>
  );
}

function Details() {
  const params = useSearchParams();
  const router = useRouter();

  const data: {
    name: string;
    date: string;
    hours: string;
  } = {
    name: params.get("name") || "",
    date: params.get("date") || "",
    hours: params.get("hours") || "",
  };

  const onSubmit: any = async () => {
    const response = await bookSlot(data);
    if (response.message) {
      alert(response.message);
    } else {
      alert(
        `${response.hours} hour window reserved beginning at ${response.date
          .slice(11)
          .slice(0, 5)} ${format(response.date, "dd-MM-yyyy")}`
      );
      router.push("/");
    }
  };

  return (
    <>
      <div className="flex flex-row border rounded-md shadow-md w-full">
        <div className="flex flex-col border w-6/12">
          <span className="font-bold px-6 py-4 border">Name</span>
          <span className="font-bold px-6 py-4 border">Date</span>
          <span className="font-bold px-6 py-4 border">Start Time</span>
          <span className="font-bold px-6 py-4 border">End Time</span>
          <span className="font-bold px-6 py-4 border">Hours</span>
        </div>
        <div className="flex flex-col border w-6/12">
          <span className="px-6 py-4 border">{data.name}</span>
          <span className="px-6 py-4 border">
            {format(parseISO(data.date), "dd-MM-yyyy")}
          </span>
          <span className="px-6 py-4 border">
            {data.date?.slice(11).slice(0, 5)}
          </span>
          <span className="px-6 py-4 border">
            {addHoursToTimeString(
              data.date.slice(11).slice(0, 5),
              Number(data.hours)
            )}
          </span>
          <span className="px-6 py-4 border">{data.hours}</span>
        </div>
      </div>
      <div className="flex justify-center my-4 w-full">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={onSubmit}
        >
          Book Now
        </Button>
        <Button
          type="button"
          onClick={() => router.back()}
          className="rounded-md bg-gray-500 hover:bg-gray-700 px-6 py-2 mx-2 text-sm font-semibold shadow-sm text-white font-bold focus:outline-none focus:shadow-outline"
        >
          Back
        </Button>
      </div>
    </>
  );
}
