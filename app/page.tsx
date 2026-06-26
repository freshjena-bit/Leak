import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import FileCard from "@/components/FileCard";
import { supabase } from "@/lib/supabase";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const keyword = params.q ?? "";

  let query = supabase
    .from("files")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (keyword) {
    query = query.ilike("title", `%${keyword}%`);
  }

  const { data } = await query;

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto p-4">

        <SearchBar />

        <div className="grid md:grid-cols-3 gap-6">

          {data?.map((file) => (
            <FileCard
              key={file.id}
              file={file}
            />
          ))}

        </div>

      </main>
    </>
  );
      }
