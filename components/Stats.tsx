type Props={

total:number;

downloads:number;

}

export default function Stats({

total,

downloads

}:Props){

return(

<div className="grid md:grid-cols-2 gap-5 mb-8">

<div className="bg-white shadow rounded-xl p-5">

<p>Total File</p>

<h2 className="text-3xl font-bold">

{total}

</h2>

</div>

<div className="bg-white shadow rounded-xl p-5">

<p>Total Download</p>

<h2 className="text-3xl font-bold">

{downloads}

</h2>

</div>

</div>

)

}
