export interface APIResult {
  count: number;
  results: Result[];
}

export interface Result {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

export interface RatingResult {
  Ratings: Rating[];
  Poster: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface Movie {
  title: string;
  director: string;
  producer: string;
  episodeId: number;
  episodeName: string;
  description: string;
  releaseDate: string;
}

export type SortKey = 'episode' | 'year';

export type SortOrder = 'ascending' | 'descending';

export interface SortOptions {
  key: SortKey;
  order: SortOrder;
}
