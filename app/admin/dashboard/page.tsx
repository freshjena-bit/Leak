import { adminSupabase } from "@/lib/server";
import Link from "next/link";

export default async function Dashboard() {
  const { data: files } = await adminSupabase
    .from("files")
    .select("*")
    .order("created_at", { ascending: false });

  const total = files?.length ?? 0;
  const pending = files?.filter(f => !f.approved).length ?? 0;
  const approved = files?.filter(f => f.approved).length ?? 0;

  return (
    <main className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard Admin
        </h1>

        <form action="/api/admin/logout" method="POST">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
            Logout
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Total File</h2>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-3xl font-bold text-orange-500">
            {pending}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-gray-500">Approved</h2>
          <p className="text-3xl font-bold text-green-600">
            {approved}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow overflow-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Judul</th>

              <th className="p-3 text-left">Uploader</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {files?.map(file => (

              <tr
                key={file.id}
                className="border-t"
              >

                <td className="p-3">

                  {file.title}

                </td>

                <td className="p-3">

                  {file.uploader}

                </td>

                <td className="p-3">

                  {file.approved
                    ? "Approved"
                    : "Pending"}

                </td>

                <td className="p-3 flex gap-2">

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

                      <button className="bg-green-600 text-white px-3 py-1 rounded">
                        Approve
                      </button>

                    </form>

                  )}

                  <Link
                    href={`/admin/edit/${file.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
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

                    <button className="bg-red-600 text-white px-3 py-1 rounded">
                      Delete
                    </button>

                  </form>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
                }
