export interface Blog{
  id: string,
  title: string,
  content: string,
  author: string,
  publishDate: Date,
  imageUrl?: string,
  lastUpdated?: Date
}
