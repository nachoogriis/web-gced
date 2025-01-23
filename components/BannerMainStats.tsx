export default function BannerMainStats() {
    return (
        <section className="bg-[#4BADD9] grid grid-cols-2 grid-rows-2 p-6 gap-x-24 gap-y-6 text-white font-bold">
            <div className="flex flex-col gap-1 text-end">
            <p className ="text-xl">Salari mitjà</p>
            <p className="text-5xl">40K - 80K€</p>
            </div>
            <div className="flex flex-col gap-1">
            <p className ="text-xl">Salari mitjà</p>
            <p className="text-5xl">40K - 80K€</p>
            </div>
            <div className="flex flex-col gap-1 text-end">
            <p className ="text-xl">Percentatge ocupabilitat</p>
            <p className="text-5xl">95%</p>
            </div>
            <div className="flex flex-col gap-1">
            <p className ="text-xl">Percentatge dones</p>
            <p className="text-5xl">40%</p>
            </div>
        </section>
    );
  }
  