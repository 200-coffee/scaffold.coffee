export const validatePackageName = (
  name: string,
  defaultName: string,
): boolean => {
  return /^[a-z0-9-]+$/.test(name === '.' ? defaultName : name)
}
