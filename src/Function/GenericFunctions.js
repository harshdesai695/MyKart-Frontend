export const isJsonObject=(data)=> {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
