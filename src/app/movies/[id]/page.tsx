import FilmContent from "@/components/FilmContent/FilmContent"

const FilmPage = async ({ params }: { params: { id: string } }) => {
  const { film, images } = await getMovieById(params.id)
  return (
    <>
      <FilmContent data={film} images={images} />
    </>
  )
}

export default FilmPage

const getMovieById = async (id: string) => {
  const apiKey = "GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2"
  const headers = {
    "X-API-KEY": apiKey,
  }

  const [dataFilmResponse, filmImageResponse] = await Promise.all([
    fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, { headers }),
    fetch(`https://api.kinopoisk.dev/v1.4/image?movieId=${id}`, { headers }),
  ])

  if (!dataFilmResponse.ok || !filmImageResponse.ok) {
    throw new Error("Failed to fetch data")
  }

  const film = await dataFilmResponse.json()
  const images = await filmImageResponse.json()

  return { film, images }
}
