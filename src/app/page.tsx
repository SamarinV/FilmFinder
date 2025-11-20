import { CollectionMovie, PreviewMovie } from "@/common/UI"
import { Movie } from "@/common/types"

export default async function App() {
  const previewRandomMovie = await getRandomMovie()
  return (
    <div className="flex min-h-screen flex-col">
      <section>
        <PreviewMovie data={previewRandomMovie} />
      </section>
      <section>
        <CollectionMovie title="Популярные фильмы" collection="popular" />
        <CollectionMovie title="Фильмы России" collection="russia" />
        <CollectionMovie title="Фантастика" collection="fantastic" />
        <CollectionMovie title="Ужасы" collection="horror" />
      </section>
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

  const film: Movie = await randomMovieResponse.json()

  return film
}
