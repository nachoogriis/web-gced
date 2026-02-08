"use client"

import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet"
import type { LatLngExpression } from "leaflet"
import countries from "i18n-iso-countries"
import es from "i18n-iso-countries/langs/es.json"
import ca from "i18n-iso-countries/langs/ca.json"
import en from "i18n-iso-countries/langs/en.json"
import worldCountries from "world-countries"

// Fix icon (solo si algún día usas <Marker />; aquí usamos CircleMarker, no hace falta)
// import L from "leaflet"

countries.registerLocale(es)
countries.registerLocale(ca)
countries.registerLocale(en)

type Point = { label: string; count: number }

function norm(s: string) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,;:]+$/g, "")
    .replace(/\s+/g, " ")
}

const ISO2_ALIASES: Record<string, string> = {
  "estats units": "US",
  "estados unidos": "US",
  "eeuu": "US",
  "usa": "US",
  "united states": "US",
  "united states of america": "US",

  "reino unido": "GB",
  "uk": "GB",
  "u.k.": "GB",
  "united kingdom": "GB",
  "gran bretana": "GB",
  "great britain": "GB",

  "paises bajos": "NL",
  "paisos baixos": "NL",
  "holanda": "NL",

  "corea del sur": "KR",
  "korea": "KR",
  "south korea": "KR",

  "rusia": "RU",
  "russian federation": "RU",
}

function toISO2(name: string) {
  const k = norm(name)
  if (ISO2_ALIASES[k]) return ISO2_ALIASES[k]

  // luego intenta con librería (en caso de que sí lo reconozca)
  return (
    countries.getAlpha2Code(name.trim(), "es") ||
    countries.getAlpha2Code(name.trim(), "ca") ||
    countries.getAlpha2Code(name.trim(), "en") ||
    null
  )
}


function findLatLngByISO2(iso2: string): [number, number] | null {
  const c: any = (worldCountries as any[]).find((x) => x.cca2 === iso2)
  const latlng = c?.latlng
  if (!latlng || latlng.length < 2) return null
  return [latlng[0], latlng[1]]
}

export default function MobilityMap({ points }: { points: Point[] }) {
  const max = Math.max(0, ...points.map((p) => p.count))

  const markers = points
    .map((p) => {
      const iso2 = toISO2(p.label)
      if (!iso2) return null
      const latlng = findLatLngByISO2(iso2)
      if (!latlng) return null
      const radius = max === 0 ? 6 : 6 + Math.round((p.count / max) * 10)
      return { ...p, iso2, latlng, radius }
    })
    .filter(Boolean) as Array<{ label: string; count: number; iso2: string; latlng: [number, number]; radius: number }>

  return (
      <div className="px-4 pb-4">
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl bg-white ring-1 ring-black/5 sm:h-[320px] lg:h-[480px]">
          <MapContainer
            center={[20, 0] as LatLngExpression}
            zoom={2}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map((m) => (
              <CircleMarker
                key={`${m.iso2}-${m.label}`}
                center={m.latlng}
                radius={m.radius}
                pathOptions={{
                  color: "rgb(0, 86, 166)",
                  fillColor: "rgb(0, 86, 166)",
                  fillOpacity: 0.25,
                  weight: 1,
                }}
              >
                <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                  {m.label}: {m.count}
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
    </div>
  )
}
