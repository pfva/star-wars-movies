export interface APIResult {
  count: number;
  results: Result[];
}

export interface Result {
  title: string;
  episode_id: number;
  opening_crawl: number;
  director: string;
  producer: string;
  release_date: string;
}

export interface Movie {
  title: string;
  director: string;
  producer: string;
  episode: number;
  description: number;
  releaseDate: string;
}
