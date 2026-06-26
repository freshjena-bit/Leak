"use client";

export default function Error({
  error,
  reset
}:{
  error:Error;
  reset:()=>void;
}){

  return(

<main className="min-h-screen flex items-center justify-center">

<div className="text-center">

<h1 className="text-3xl font-bold">
Terjadi Kesalahan
</h1>

<p className="mt-4">
{error.message}
</p>

<button

onClick={reset}

className="bg-blue-600 text-white px-5 py-3 rounded-lg mt-6"

>

Coba Lagi

</button>

</div>

</main>

)

}
