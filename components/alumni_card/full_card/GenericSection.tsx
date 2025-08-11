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

  const Title = ({ text }: { text: string }) => {
    return <span className="font-bold inline-block min-w-[8em] text-foreground/80 ">{text}</span>
  }
  const Item = ({ title, explanation }: { title: string; explanation: string }) => (
    <div className="text-sm flex flex-row">
      <Title text={title} />
      {explanation}
    </div>
  )

  return (
    <section>
      <h2 className="text-m text-upc font-bold border-b border-upc/30 mb-2 text-xl">{title}</h2>
      {itemLists.map((items, i) => (
        <div key={i} className="mb-6 flex flex-col gap-2.5">
          {items.map((item, j) => (
            <Item key={j} title={item.name} explanation={item.text} />
          ))}
        </div>
      ))}
    </section>
  )
}
