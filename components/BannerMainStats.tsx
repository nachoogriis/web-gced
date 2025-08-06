export default function BannerMainStats() {
  return (
    <section className="bg-[#4BADD9] grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 p-4 sm:p-6 gap-4 sm:gap-x-24 sm:gap-y-6 text-white font-bold">
      <div className="flex flex-col gap-1 text-center sm:text-end">
        <p className="text-lg md:text-lg lg:text-xl">Salari mitjà</p>
        <p className="text-3xl md:text-4xl lg:text-5xl">40K - 80K€</p>
      </div>
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <p className="text-lg md:text-lg lg:text-xl">Salari mitjà</p>
        <p className="text-3xl md:text-4xl lg:text-5xl">40K - 80K€</p>
      </div>
      <div className="flex flex-col gap-1 text-center sm:text-end">
        <p className="text-lg md:text-lg lg:text-xl">Percentatge ocupabilitat</p>
        <p className="text-3xl md:text-4xl lg:text-5xl">95%</p>
      </div>
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <p className="text-lg md:text-lg lg:text-xl">Percentatge dones</p>
        <p className="text-3xl md:text-4xl lg:text-5xl">40%</p>
      </div>
    </section>
  );
}