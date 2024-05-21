"use server";
import { revalidateTag } from "next/cache";

export async function getBooking() {
  const response: any = await fetch(
    `${process.env.NODE_SERVER_ADDRESS}/get-booking`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["get_booking"],
      },
    }
  ).then((data) => data.json());

  if (response.returnCode === 200) return response.data;
  else [];
}

export async function bookSlot(payload: any) {
  const response: any = await fetch(
    `${process.env.NODE_SERVER_ADDRESS}/add-booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  ).then((data) => data.json());

  if (response.returnCode === 200) {
    revalidateTag("get_booking");
    return response.data;
  } else {
    return response;
  }
}
