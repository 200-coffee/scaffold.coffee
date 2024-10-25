export type tOption = {
  name: string
  label: string
}

export type tFramework = {
  name: string
  label: string
  version: string
  languages: tOption[]
}

export type tRegistry = {
  frameworks: tFramework[]
  styling: tOption[]
  testing: tOption[]
  ui: tOption[]
}