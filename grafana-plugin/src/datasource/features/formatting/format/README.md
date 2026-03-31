## Formats data from raw ITM form into human-readable form

There are few places where formatting from ITM into human-readable form is required:

- Data in actual panels (tables, bars, histograms, etc.)
- Query editor (filters part)
- Variables support

Principles for formatting are common for all three places, details are explained futher.

### Data flow and formatting from User perspective

<img src="https://wiki.rocketsoftware.com/rest/gliffy/1.0/embeddedDiagrams/51cd726d-1dbc-4468-b61d-6a162e44869c.png" style="float: left; margin-right: 10px;"/>

### Formatting algorithm diagram

<img src="https://wiki.rocketsoftware.com/rest/gliffy/1.0/embeddedDiagrams/8882a0df-b5d5-4180-a270-194071eb4dc8.png" style="float: left; margin-right: 10px;"/>

### Formatting functions

In the code you can find the following formatting functions:

- ApplyBaseFormatting
- ApplyGrafanaFormatting
- ApplyAllFormatting

`ApplyBaseFormatting` applies scale factor formatting. It works based on Column Metadata that is passed as parameter.

`ApplyGrafanaFormatting` applies enum, hex formatting. It works based on Grafana's Field object. Field object contains information about enums (mapping in Grafana terms) and unit display (hex/string display etc.).

`ApplyAllFormatting` calls first two functions. Applies base formatting first and grafana - second.

### Data formatting

The following steps describes Formatting of data:

- Basic call for query is done, after this `applyBaseFormatting` is applied in `formatResponse.ts`.
- In `formatResponse.ts` also prepare Frame information, populate it with enums, unit, title (information is taken from ColumnMetadata by `addColumnMetadataToFieldConfig` function).
- Data is passed into Grafana panel, there grafana formatting is applied automaticaly by Grafana.

### Query Editor formatting

Format of query editor form happens in `convertToMetricsQueryFilter.ts` by `applyAllFormatting` call.

### Variable formatting.

Format of variable happens next way:

- Basic call for query is done, and result Frame passed to `VariableSupport.ts` functionality.
- Here `ApplyGrafanaFormatting` is applyed for Frame`s values.

### Enums

#### Enums in timestamp columns

Even though technically timestamp columns sometimes have enums (e.g. KDP.DP_SRM_UTL.UTL_RDATE has enum "0000000000000000" -> "N/A"), as of 2023-12-04 Dima told to not handle enums in case of timestamp columns (may change in future).

#### Formatting in enums

As far as enum formatting is done on Grafana side and after we apply scale factor, we need to prepare mapping to reflect this.
We apply base formatting on enum keys at the moment we receive metadata: `features/metadata/createMetadataTanStackQueries.ts:78`.
After this when request is done and we prepare Data Frame, mapping will be done automatically on Grafana side.
