import ProductItem from "@/components/ProductItem"
import Link from "next/link"

const SSRpage = async () => {
  const res = await fetch("https://dummyjson.com/products", {cache: "no-store"})
  const data = await res.json()

  return (
    <div className="p-5">
      <h1 className="text-black font-semibold text-[60px] text-center mb-3">
        SSR - Server Side Rendering
      </h1>
      <div className="flex gap-3 justify-center mb-2">
        <Link href="/csr" className="px-4 py-2 rounded font-medium text-[24px]">CSR</Link>
        <Link href="/isr" className="px-4 py-2 rounded font-medium text-[24px]">ISR</Link>
        <Link href="/ssg" className="px-4 py-2 rounded font-medium text-[24px]">SSG</Link>
        </div>
      <div className="flex justify-center items-center gap-5 flex-wrap">
        {data.products.map((item: any) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default SSRpage
