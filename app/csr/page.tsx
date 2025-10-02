"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { ProductType } from "@/@types/ProductType"
import { CategoryType } from "@/@types/CategoryType"
import ProductItem from "@/components/ProductItem"
import Image from "next/image"
import Link from "next/link"

const CSRcontent = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [category, setCategory] = useState<CategoryType[]>([])
  const [categorySlug, setCategorySlug] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState<string>("") 


  useEffect(() => {
    axios.get("https://dummyjson.com/products").then(res => {
    setLoading(false)
    setProducts(res.data.products)
    })
  }, [])

  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories").then(res => {
      setCategory(res.data);
      })
  }, [])

  useEffect(() => {
    if(categorySlug){
      axios.get(`https://dummyjson.com/products/category/${categorySlug}`).then(res => {
        setLoading(false)
        setProducts(res.data.products)
      })
    }
  }, [categorySlug])
  
  function handleClickSelect(e:React.ChangeEvent<HTMLSelectElement>) {
    setLoading(true)
    setCategorySlug(e.target.value)
  }

  //search input
  function handleSearchFn(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setSearchValue(value)

    if (value === "") {
      axios.get("https://dummyjson.com/products").then(res => {
        setProducts(res.data.products)
      })
    } else {
      axios.get("https://dummyjson.com/products").then(res => {
        const filtered = res.data.products.filter((item: ProductType) =>
          item.title.toLowerCase().includes(value.toLowerCase()) ||
          item.price.toString().includes(value)
        )
        setProducts(filtered)
      })
    }
  }


  return (
    <div className="p-5">
     <h1 className="text-black font-semibold text-[60px] text-center mb-3">CSR - Client Side Rendering</h1>
      <div className="flex items-center justify-between mb-5">
       <div className="flex items-center gap-5">
        <input autoComplete="off" onChange={handleSearchFn} value={searchValue} className="w-[300px] p-2 rounded-md border-[1px]  outline-none " type="text" placeholder="Qidirish" name="search" />
        <select onChange={handleClickSelect} className="w-[300px] p-2 rounded-md border-[1px]  outline-none ">
          <option value="all">All</option>
          {category.map((item, index) => <option key={index} value={item.slug} >{item.name}</option>)}
        </select>
       </div>
        <div className="flex gap-3">
        <Link href="/isr" className="px-4 py-2 rounded font-medium text-[24px]">ISR</Link>
        <Link href="/ssg" className="px-4 py-2 rounded font-medium text-[24px]">SSG</Link>
        <Link href="/ssr" className="px-4 py-2 rounded font-medium text-[24px]">SSR</Link>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5 flex-wrap">
        {loading ? <Image className="mx-auto" src={"loading"} alt="Loading" width={300} height={300} /> : products.map(item => <ProductItem key={item.id} item={item}/>)}
      </div>

    </div>

  )
}

export default CSRcontent
