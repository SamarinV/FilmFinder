"use client"

import { Movie } from "@/common/types"
import SearchFilms from "@/common/UI/SearchFilms/SearchFilms"
import { useEffect, useState } from "react"

const SearchPage = ({ searchParams }: { searchParams: { query?: string } }) => {
  const query = searchParams.query
  const [films, setFilms] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query) return

    const fetchMovies = async () => {
      setIsLoading(true)
      try {
        const { films: fetchedFilms } = await getMovieByQuery(query)
        setFilms(fetchedFilms.docs)
      } catch (error) {
        console.error("Ошибка при загрузке фильмов:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [query])

  return (
    <div>
        <SearchFilms films={films} query={query} isLoading={isLoading} />
    </div>
  )
}

export default SearchPage

const getMovieByQuery = async (query: string) => {
  const apiKey = "GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2"
  const headers = {
    "X-API-KEY": apiKey,
  }

  const dataSearchResponse = await fetch(
    `https://api.kinopoisk.dev/v1.4/movie/search?query=${encodeURIComponent(query)}`,
    { headers }
  )

  if (!dataSearchResponse.ok) {
    throw new Error("Failed to fetch data")
  }

  const films = await dataSearchResponse.json()

  return { films }
}
