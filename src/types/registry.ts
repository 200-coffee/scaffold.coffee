export type tLibrary = {
  name: string
  label: string
}

export type tLanguage = {
  name: string
  label: string
  libraries: tLibrary[]
}

export type tFramework = {
  name: string
  label: string
  version: string
  languages: tLanguage[]
}
