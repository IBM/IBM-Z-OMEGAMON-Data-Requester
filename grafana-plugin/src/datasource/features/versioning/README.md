# Versioning

Versioning feature enables backwards compatibility, aiming to improve user experience (see example use cases below).

It can be used for important API structures (such as Metrics query), that may change throughout project development.

## How to use

When need to update API object:

1. If it had no versioning before:
   1. Create subfeature folder (e.g. `/versioning/dsConfig/`)
   2. Create an empty updater functions array (e.g. `dsConfigUpdaters`)
   3. Add bump script instance in package.json (e.g. `bump:dsConfig`), you can use `bump:FalconQuery` as a base
   4. Create function that returns latest version object (e.g. `updateDsConfigToLatestVersion`)
2. Update the type definitions in `/domain/`
3. Run bump script (e.g. `yarn run bump:dsConfig`)
4. Open generated dump file (`DsConfig_V${XXX}.ts`) and inplement `updateTo_V${XXX}` function
5. Update unittests

## Example use case

User creates and saves new panel that is using Metrics query. Grafana automatically saves this query on it's persistent storage. After a month Falcon update is released, where Metrics query structure is changed. New Falcon code is designed to work with this new query structure. It does not understand how to deal with this old query that's been created a month ago. To fix this issue the versioning feature automatically kicks in and transforms old query structure into newest one. This allows user to view the old dashboard/panel without any effort.

However, let's say after half year yet another Falcon update comes out. This time Metrics query structure has breaking changes (e.g. added new mandatory field that user needs to set). Versioning feature is unable to update old query into new structure. Now user is required to fix the query themselves.
