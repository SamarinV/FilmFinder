export type Movie = {
  id: number
  externalId: {
    kpHD: string
    imdb: null
    tmdb: null
  }
  name: string
  alternativeName: string | null
  slogan?: string
  names: [
    {
      name: string
      language: string
      type: string
    }
  ]
  type: string
  typeNumber: number
  year: number
  description: string
  rating: {
    kp: number | null
    imdb: number | null
    tmdb: number | null
    filmCritics: number
    russianFilmCritics: number
    await: number | null
  }
  votes: {
    kp: number | null
    imdb: number | null
    tmdb: number | null
    filmCritics: number
    russianFilmCritics: number
    await: number | null
  }
  movieLength: number
  ratingMpaa: null
  ageRating: number
  logo: null
  poster: {
    url: string
    previewUrl: string
  }
  backdrop: {
    url: string | null
    previewUrl: string | null
  }
  videos: null
  genres: [
    {
      name: string
    }
  ]
  countries: [
    {
      name: string
    }
  ]
  persons: [
    {
      id: number
      photo: string
      name: string
      enName: null
      description: null
      profession: string
      enProfession: string
    }
  ]
  reviewInfo: null
  seasonsInfo: null
  budget: null
  fees: null
  premiere: {
    country: null
    world: null
    russia: null
    digital: null
    cinema: null
    bluray: null
    dvd: null
  }
  similarMovies: null
  sequelsAndPrequels: null
  watchability: {
    items: [
      {
        name: string
        logo: {
          url: string
        }
        url: string
      }
    ]
  }
  releaseYears: null
  top10: null
  top250: null
  ticketsOnSale: false
  totalSeriesLength: null
  seriesLength: null
  isSeries: false
  audience: [
    {
      count: number
      country: string
    }
  ]
  lists: [string]
  networks: {
    Items: null
  }
  updatedAt: string
  createdAt: string
  facts: null
  imagesInfo: {
    postersCount: null
    backdropsCount: null
    framesCount: null
  }
}

export type MovieImages = {
  docs: [
    {
      movieId: number
      type: string
      url: string
      previewUrl: string
      height: number
      width: number
      createdAt: string
      updatedAt: string
      id: string
    }
  ]
}

export type Movies = {
  docs: Movie[]
  total: number
  limit: number
  page: number
  pages: number
}
