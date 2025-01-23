import Image from "next/image";

export default function CompanyLogo({ image }: { image: string}) {
  return (
    <div className="border rounded overflow-clip">
      <Image src={image} alt="Google" width={140} height={80} />
    </div>
  );
}
