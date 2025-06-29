
export function getBaseUrl(request:any) {
  const protocol = request.protocol()
  const host = request.host()
  return `${protocol}://${host}`
}
