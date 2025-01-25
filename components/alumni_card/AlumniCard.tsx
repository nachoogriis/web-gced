import GcedButton from "@/components/GcedButton"
import AlumniTopPart from "@/components/alumni_card/AlumniTopPart"
import InfoCardLine from "@/components/alumni_card/InfoCardLine"
import InternshipIcon from "@/components/icons/InternshipIcon"
import MasterIcon from "@/components/icons/MasterIcon"
import TfgIcon from "@/components/icons/TfgIcon"
import { AlumniCardInfo } from "@/lib/db/alumni"
import { InfoIcon } from "../icons/InfoIcon"

type Props = {
  alumni: AlumniCardInfo
}
export default function AlumniCard({ alumni }: Props) {
  const { firstName, lastName, generation, internships, tfgTitle, masters } =
    alumni
  return (
    <div className="rounded-[15px] border border-[#B0DAED] bg-white overflow-hidden h-[380px]">
      <div className="flex flex-col items-start gap-[0.4em] p-4">
        {/* Parte superior con el nombre y generación */}
        <AlumniTopPart
          name={firstName}
          surname={lastName}
          generation={generation}
        />

        {/* Información adicional */}
        <div className="flex flex-col justify-center items-start gap-2 mt-4">
          {/* Línea de prácticas */}
          <InfoCardLine
            icon={<InternshipIcon />}
            title="Pràctiques"
            description={internships[0].organization}
          />

          {/* Línea del TFG */}
          <InfoCardLine
            icon={<TfgIcon />}
            title="TFG"
            description={tfgTitle || "No especificat"}
          />

          {/* Línea del máster */}
          <InfoCardLine
            icon={<MasterIcon />}
            title="Màster"
            description={
              masters && masters.length > 0 ? masters[0].name : "No especificat"
            }
          />
        </div>
      </div>

      {/* Botón de "Més informació" */}
      <div className="flex w-full justify-center items-center mt-[10px]">
        <GcedButton>
          <InfoIcon className="text-lg" />
          Més informació
        </GcedButton>
      </div>
    </div>
  )
}
