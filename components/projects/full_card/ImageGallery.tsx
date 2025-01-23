import { useState } from "react";

export default function ImageGallery({}) {
  const data = [
    { imagePath: "/projects-demo.png" },
    { imagePath: "/projects-demo-2.png" },
    { imagePath: "/projects-demo-3.png" },
  ];

  const [active, setActive] = useState("/projects-demo.png");

  return (
    <div className="grid gap-6">
      <div>
        <img
          className="h-auto w-full rounded-lg object-cover object-center"
          src={active}
          alt=""
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        {data.map(({ imagePath }, index) => (
          <div key={index}>
            <img
              onClick={() => setActive(imagePath)}
              src={imagePath}
              className={`h-20 cursor-pointer rounded-lg object-cover object-center ${active === imagePath ? 'border-2 border-black' : ''}`}
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
