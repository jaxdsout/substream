export interface ResultData {
  id: string
  name: string
  image_url: string
  [key: string]: unknown
}

export interface SourceData {
  web_url?: string
  logo?: string
  name?: string
  type?: string
  [key: string]: unknown
}

export interface ChoiceData {
  id?: string
  title?: string
  posterLarge?: string
  us_rating?: string
  user_rating?: number
  year?: number
  runtime_minutes?: number
  genre_names?: string[]
  sources?: SourceData[]
  imdb_id?: string
  type?: string
  rating?: string
  [key: string]: unknown
}
