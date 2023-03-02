export interface IGet {
  url: string
  query?: Record<string, any>
}

export interface IPost {
  url: string
  query?: Record<string, any>
  body?: Record<string, any>
}

export interface IPatch {
  url: string
  body: Record<string, any>
}

export interface IDelete {
  id: number
  url: string
}

export interface IOptionalApiProps {
  statusCode?: number | undefined
  message?: string | undefined
}
