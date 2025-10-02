import ProductItem from "@/components/ProductItem"
import Link from "next/link"

const SSGpage = async () => {
  const res = await fetch("https://dummyjson.com/products", {cache: "force-cache"})
  const data = await res.json()

  return (
    <div className="p-5">
      <h1 className="text-black font-semibold text-[60px] text-center mb-3">
        SSG - Static Site Generation
      </h1>
       <div className="flex gap-3 justify-center mb-2">
        <Link href="/csr" className="px-4 py-2 rounded font-medium text-[24px]">CSR</Link>
        <Link href="/isr" className="px-4 py-2 rounded font-medium text-[24px]">ISR</Link>
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
