"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

interface Giphy {
  data: [{
    images: {
      original: {
        url: string
      }
    },
    title: string
  }]
}

export default function Home() {
  const [giphys, setGiphys] = useState<Giphy>()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchTerm(value)
  }

  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${process.env.NEXT_PUBLIC_API_KEY}&limit=20`)
    const giphys = await data.json();
    setGiphys(giphys)
  }

  return (<>
    <form className={styles.form} onSubmit={search}>
      <input className={styles["form-input"]} name="searchTerm" onChange={handleInputs} type="text" required />
      <button className={styles["form-button"]}>Search</button>
    </form>
    <div className={styles.container}>
      {giphys === undefined && <>What Giphys do you want to search?</>}
      {giphys !== undefined && giphys.data.map((pic, index: number) => {
        return (
          <div className={styles.item} key={index}>
            <h5>{pic.title}</h5>
            <Image src={pic.images.original.url} alt={pic.title} width={200} height={200} unoptimized />
          </div>
        )
      })}
    </div></>);
}