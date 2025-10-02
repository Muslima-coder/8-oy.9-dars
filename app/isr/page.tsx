import ProductItem from "@/components/ProductItem"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "ISR sahifasi :)❤️ ",
  description: "Nimadir...",
};

const SSGpage = async () => {
  const res = await fetch("https://dummyjson.com/products", {next:{revalidate: 60}})
  const data = await res.json()


  return (
    <div className="p-5 containers">
      <h1 className=" font-semibold text-[60px] text-center mb-3">
        ISR - Incremental Static Regeneration
      </h1>
       <div className="flex gap-3 justify-center mb-2">
        <Link href="/csr" className="px-4 py-2 rounded font-medium text-[24px]">CSR</Link>
        <Link href="/ssg" className="px-4 py-2 rounded font-medium text-[24px]">SSG</Link>
        <Link href="/ssr" className="px-4 py-2 rounded font-medium text-[24px]">SSR</Link>
        </div>
      <div className="flex justify-center items-center gap-5 flex-wrap">
        {data.products.map((item: any) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default SSGpage
