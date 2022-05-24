type HttpResponse<ResponseType> = Response & {
  parsedBody?: ResponseType
}

type FetcherArgs = Parameters<typeof fetch>

export function fetcher(...args: FetcherArgs) {
  return fetch(...args).then((res) => res.json())
}

export async function http<ResponseType>(
  request: RequestInfo
): Promise<HttpResponse<ResponseType>> {
  const response: HttpResponse<ResponseType> = await fetch(request)

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const parsedBody = await response.json().catch(() => ({}))

  return {
    ...response,
    parsedBody,
  }
}

export async function get<ResponseType>(
  path: string,
  args?: RequestInit
): Promise<HttpResponse<ResponseType>> {
  const init = {method: 'get', ...args}
  return await http<ResponseType>(new Request(path, init))
}

export async function post<RequestBody, ResponseType>(
  path: string,
  body: RequestBody,
  args?: RequestInit
): Promise<HttpResponse<ResponseType>> {
  const init = {
    method: 'post',
    body: typeof body === 'string' ? body : JSON.stringify(body),
    ...args,
  }
  return await http<ResponseType>(new Request(path, init))
}
