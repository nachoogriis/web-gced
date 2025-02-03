import React from 'react';

type TfgType = {
  tfgTitle: string;
  tfgDescription: string;
  tfgUniversity: string;
  tfgCountry: string;
};

const TfgSection: React.FC<TfgType> = ({ tfgTitle, tfgDescription, tfgUniversity, tfgCountry }) => {
  return (
    <section>
      <h2 className="text-m text-[#007BC0] font-bold border-b pb-1 mt-6 mb-2">
        Trabajo de final de grado
      </h2>
      <div className="mb-4">
        <p className="text-sm">
          <span className="font-bold">Título:</span> {tfgTitle}
        </p>
        <p className="text-sm">
          <span className="font-bold">Descripción:</span> {tfgDescription}
        </p>
        <p className="text-sm">
          <span className="font-bold">Universidad:</span> {tfgUniversity}
        </p>
        <p className="text-sm">
          <span className="font-bold">País:</span> {tfgCountry}
        </p>
      </div>
    </section>
  );
};

export default TfgSection;