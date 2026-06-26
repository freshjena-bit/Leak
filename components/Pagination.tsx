"use client";

import { useRouter,useSearchParams } from "next/navigation";

export default function Pagination({

page,

total

}:{

page:number;

total:number;

}){

const router=useRouter();

const params=useSearchParams();

function move(next:number){

const p=new URLSearchParams(params);

p.set("page",String(next));

router.push("/?"+p.toString());

}

return(

<div className="flex justify-center gap-4 mt-8">

<button

disabled={page<=1}

onClick={()=>move(page-1)}

className="border rounded-lg px-4 py-2"

>

Prev

</button>

<span>

{page}

</span>

<button

disabled={page>=total}

onClick={()=>move(page+1)}

className="border rounded-lg px-4 py-2"

>

Next

</button>

</div>

)

}
