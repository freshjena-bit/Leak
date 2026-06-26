import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FileCard from "@/components/FileCard";
import Pagination from "@/components/Pagination";
import { adminSupabase } from "@/lib/server";

const LIMIT = 9;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;

  const keyword = params.q ?? "";

  const page = Number(params.page ?? "1");

  const from = (page - 1) * LIMIT;

  const to = from + LIMIT - 1;

  let query = adminSupabase
    .from("files")
    .select("*", {
      count: "exact",
    })
    .eq("approved", true)
    .order("created_at", {
      ascending: false,
    });

  if (keyword) {
    query = query.or(
      `title.ilike.%${keyword}%,description.ilike.%${keyword}%`
    );
  }

  const {
    data,
    count,
  } = await query.range(from, to);

  const totalPage = Math.max(
    1,
    Math.ceil((count ?? 0) / LIMIT)
  );

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto p-5">

        <SearchBar />

        <div className="grid md:grid-cols-3 gap-6">

          {data?.map((item) => (
            <FileCard
              key={item.id}
              file={item}
            />
          ))}

        </div>

        <Pagination
          page={page}
          total={totalPage}
        />

      </main>

      <Footer />

    </>
  );
        }
