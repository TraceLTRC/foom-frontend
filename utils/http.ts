export function getApiEndpoint(...parts: string[]) {
  return [
    process.env.BACKEND_ENDPOINT ?? "", 
    ...parts.map(p => p.replace(/^\/+|\/+$/g, ''))
  ].join("/");
}
