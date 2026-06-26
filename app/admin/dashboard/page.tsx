import { adminSupabase } from "@/lib/server";
import Link from "next/link";
import Image from "next/image";

const LIMIT = 15;

export default async function Dashboard({
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
    .order("created_at", {
      ascending: false,
    });

  if (keyword) {
    query = query.or(
      `title.ilike.%${keyword}%,uploader.ilike.%${keyword}%`
    );
  }

  const { data, count } = await query.range(from, to);

  const total = count ?? 0;

  const totalPage = Math.max(
    1,
    Math.ceil(total / LIMIT)
  );

  const pending =
    data?.filter((x) => !x.approved).length ?? 0;

  const approved =
    data?.filter((x) => x.approved).length ?? 0;

  return (
    <main className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <form
          action="/api/admin/logout"
          method="POST"
        >
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </form>

      </div>

      <form className="mb-8">

        <input
          name="q"
          defaultValue={keyword}
          placeholder="Cari..."
          className="border rounded-lg p-3 w-full"
        />

      </form>

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Total File</h2>
          <p className="text-3xl font-bold">
            {total}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Approved</h2>
          <p className="text-3xl font-bold text-green-600">
            {approved}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2>Pending</h2>
          <p className="text-3xl font-bold text-orange-600">
            {pending}
          </p>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-5">

        {data?.map((file) => (

          <div
            key={file.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >

            <Image
              src={file.preview}
              width={500}
              height={300}
              alt={file.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">

              <h2 className="font-bold">
                {file.title}
              </h2>

              <p className="text-gray-500">
                {file.uploader}
              </p>

              <div className="flex gap-2 mt-5">

                {!file.approved && (

                  <form
                    action="/api/admin/approve"
                    method="POST"
                  >

                    <input
                      type="hidden"
                      name="id"
                      value={file.id}
                    />

                    <button className="bg-green-600 text-white px-4 py-2 rounded">
                      Approve
                    </button>

                  </form>

                )}

                <Link
                  href={`/admin/edit/${file.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <form
                  action="/api/admin/delete"
                  method="POST"
                >

                  <input
                    type="hidden"
                    name="id"
                    value={file.id}
                  />

                  <button className="bg-red-600 text-white px-4 py-2 rounded">
                    Delete
                  </button>

                </form>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-10">

        <Link
          href={`/?page=${Math.max(
            page - 1,
            1
          )}`}
        >
          Prev
        </Link>

        <span className="mx-4">
          {page}/{totalPage}
        </span>

        <Link
          href={`/?page=${Math.min(
            page + 1,
            totalPage
          )}`}
        >
          Next
        </Link>

      </div>

    </main>
  );
            }
