"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@/app/validation/userinfo";
import { CONSTANT } from "@/app/Utils/constant";
import Button from "@/app/Components/Button";
import { useRouter } from "next/navigation";
import { createEndpoint, getlocalISOString } from "@/app/Utils/helpers";
type Inputs = {
  name: string;
  date: string;
  hours: string;
};

export default function Form() {
  const router = useRouter();
  const today = getlocalISOString();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      date: "",
      hours: "1",
    },
    resolver: zodResolver(userInfoSchema),
  });

  const handleConfermation: SubmitHandler<Inputs> = async (data: any) => {
    const endPoint = createEndpoint("", "/confirm", data);
    router.push(endPoint);
  };

  return isSubmitting ? (
    <div className="flex items-center justify-between">
      <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" />
    </div>
  ) : (
    <>
      <form
        className="w-3/12 h-1/2 mt-8 p-4 border rounded-md shadow-md"
        onSubmit={handleSubmit(handleConfermation)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter Name"
            disabled={isSubmitting}
            {...register("name")}
          />
          {errors.name?.message && (
            <span className="text-red-700">{errors.name?.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date"
          >
            Date Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="datetime-local"
            min={today}
            disabled={isSubmitting}
            {...register("date")}
          />
          {errors.date?.message && (
            <span className="text-red-700">{errors.date?.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="hours"
          >
            Hours
          </label>
          <select
            id="hours"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("hours")}
          >
            {CONSTANT.timeSlots.map((hours, key) => (
              <option key={key} value={hours.value}>
                {hours.label}
              </option>
            ))}
          </select>
          {errors.hours?.message && (
            <span className="text-red-700">{errors.hours?.message}</span>
          )}
        </div>
        <div className="flex justify-evenly">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type={"submit"}
          >
            Confirm Booking
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="rounded-md bg-gray-500 hover:bg-gray-700 px-6 py-2 text-sm font-semibold shadow-sm text-white font-bold focus:outline-none focus:shadow-outline"
          >
            Back
          </Button>
        </div>
      </form>
    </>
  );
}
