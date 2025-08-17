interface Item {
  name: string
  text: string
}

type Props = {
  title: string
  itemLists: Item[][]
}
export default function GenericSection({ title, itemLists }: Props) {
  if (itemLists.length === 0) {
    return <></>
  }

  const Title = () => <div className="text-m text-upc font-bold border-b border-upc/30 mb-2 text-xl">{title}</div>

  const Name = ({ name }: { name: string }) => {
    return <span className="font-bold inline-block min-w-[8em] text-foreground/80 ">{name}</span>
  }
  const Item = ({ name, text }: { name: string; text: string }) => (
    <div className="text-sm flex flex-row">
      <Name name={name} />
      <span className="text-black/80">{text}</span>
    </div>
  )

  return (
    <section>
      <Title />
      {itemLists.map((items, i) => (
        <div key={i} className="mb-6 flex flex-col gap-2.5">
          {items.map((item, j) => (
            <Item key={j} {...item} />
          ))}
        </div>
      ))}
    </section>
  )
}
