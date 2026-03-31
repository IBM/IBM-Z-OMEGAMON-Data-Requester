# Subproject structure

## Folders

- common (common components, types, functions)
- domain (domain types, functions)
- features (major features; each may contain subfeature folders; subfeature folder cannot contain folders)
- grafana (stuff that fixes broken/missing things in Grafana)

## Guidelines:

- index.ts in at least more important folders, including each feature folder, common/components, etc.
- only import from index.ts, when need something from features, common code, etc.
- subfeatures should be converted to features once they become "big enough" (when they either start having their own subfeatures or other reasons - discuss with Dima & Denis)
- when fn `doSomething` is needed to be exported only for unit tests, use `export const testExports = { doSomething }` instead of simple export statement
- mocks are located in each feature's /mocks folder
