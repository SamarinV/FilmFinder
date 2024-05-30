
import PreviewMovie from "@/components/PreviewMovie/PreviewMovie"
import { Film } from "@/components/types/types"
import Image from "next/image"

export default async function App() {
  const previewRandomMovie = await getRandomMovie()
  return (
      <div className="flex min-h-screen flex-col">
        <section>
          <PreviewMovie data={previewRandomMovie} />
        </section>
        <section>Recomendend</section>
      </div>
  )
}

const getRandomMovie = async () => {
  const apiKey = "GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2"
  const headers = {
    "X-API-KEY": apiKey,
  }

  const randomMovieResponse = await fetch(`https://api.kinopoisk.dev/v1.4/movie/random?lists=top250`, { headers })

  if (!randomMovieResponse.ok) {
    throw new Error("Failed to fetch data")
  }

  const film: Film = await randomMovieResponse.json()
  console.log(film)

  return film
}
