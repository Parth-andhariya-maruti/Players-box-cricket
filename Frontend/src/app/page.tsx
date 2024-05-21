import Header from "@/app/Components/Header";
import Table from "@/app/table/page";
import dotenv from "dotenv";

dotenv.config();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Header />
      <Table />
    </main>
  );
}
