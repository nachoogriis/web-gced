import Image from "next/image";

export default function CompanyLogo({ image }: { image: string}) {
  return (
    <div className="border rounded overflow-clip w-10 md:w-15 lg:w-20">
      <Image src={image} alt="Google" width={140} height={80} />
    </div>
  );
}
