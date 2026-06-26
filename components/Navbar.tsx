import Link from "next/link";

export default function Navbar(){

return(

<header className="bg-white shadow">

<div className="max-w-6xl mx-auto p-4 flex justify-between">

<Link href="/">

<b>FILE SHARE</b>

</Link>

<div className="flex gap-4">

<Link href="/">Home</Link>

<Link href="/submit">Upload</Link>

<Link href="/admin/login">Admin</Link>

</div>

</div>

</header>

)

  }
