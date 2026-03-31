# Using variables with OMEGAMON datasource plugin <!-- omit from toc -->

- [1. Overview](#1-overview)
- [2. Creating variables](#2-creating-variables)
  - [2.1. Linked query variables](#21-linked-query-variables)
  - [2.2. Ad hoc variables](#22-ad-hoc-variables)
- [3. Referencing variables in query editor](#3-referencing-variables-in-query-editor)
  - [3.1. Variable syntax](#31-variable-syntax)
    - [3.1.1. Single variable](#311-single-variable)
    - [3.1.2. Multiple variables and/or hardcoded characters](#312-multiple-variables-andor-hardcoded-characters)
  - [3.2. Variable use in specific fields](#32-variable-use-in-specific-fields)
    - [3.2.1. `Managed systems` and `System.Parma`](#321-managed-systems-and-systemparma)
    - [3.2.2. `Filters`](#322-filters)
- [4. Resulting queries with variables applied](#4-resulting-queries-with-variables-applied)
  - [4.1. Single variable with single selected value](#41-single-variable-with-single-selected-value)
  - [4.2. Single variable with multiple selected values](#42-single-variable-with-multiple-selected-values)
  - [4.3. Multiple variables with multiple selected values](#43-multiple-variables-with-multiple-selected-values)
  - [4.4. Single variable with default ALL option selected](#44-single-variable-with-default-all-option-selected)
    - [4.4.1. In `Filters` field](#441-in-filters-field)
    - [4.4.2. In `Managed systems` field](#442-in-managed-systems-field)
  - [4.5. Single variable with custom ALL option selected](#45-single-variable-with-custom-all-option-selected)
  - [4.6. Multiple variables with default ALL option selected](#46-multiple-variables-with-default-all-option-selected)
    - [4.6.1. In `Managed systems` field](#461-in-managed-systems-field)
    - [4.6.2. In `Filters` field](#462-in-filters-field)
  - [4.7. Multiple variables with custom ALL option selected](#47-multiple-variables-with-custom-all-option-selected)
  - [4.8. Ad hoc variable](#48-ad-hoc-variable)
  - [4.9. Variables in `Filters` containing multiple conditions](#49-variables-in-filters-containing-multiple-conditions)
- [5. Ad hoc variables limitations](#5-ad-hoc-variables-limitations)
  - [5.1. No ORIGINNODE column](#51-no-originnode-column)
  - [5.2. Ad hoc variables sharing same columns](#52-ad-hoc-variables-sharing-same-columns)
  - [5.3. Duplicate columns due to case-sensitivity](#53-duplicate-columns-due-to-case-sensitivity)
  - [5.4. Filtering by column name instead of column meaning](#54-filtering-by-column-name-instead-of-column-meaning)
  - [5.5. Searching by column ID does not work (OMUI5-572)](#55-searching-by-column-id-does-not-work-omui5-572)
- [6. Appendix](#6-appendix)
  - [6.1. Default Managed System Groups](#61-default-managed-system-groups)

## 1. Overview

Variables in Grafana enable making dashboards dynamic.

For more general information, please refer to Grafana docs:
<https://grafana.com/docs/grafana/latest/dashboards/variables/>

Using a variable involves 3 steps:

1. Creating variable in dashboard settings (see [2. Creating variables](#2-creating-variables))
2. Referencing variable in query via OMEGAMON datasource plugin query editor (see [3. Referencing variables in query editor](#3-referencing-variables-in-query-editor))
3. Selecting variable value(s) in dashboard page

Following that, variable value(s) gets automatically applied to query template and the resulting query (see [4. Resulting queries with variables applied](#4-resulting-queries-with-variables-applied)) is sent to server to request for metrics.

## 2. Creating variables

For instructions on how to create variables, please see the following Grafana docs:
<https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/>

### 2.1. Linked query variables

OMEGAMON datasource plugin allows creating linked query variables (variables that depend on other variables).

See Grafana docs on how to setup a query variable: <https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable>

Once OMEGAMON plugin is selected as a datasource, in the query editor user can optionally reference other variables from that dashboard.

### 2.2. Ad hoc variables

For using ad hoc variables in Grafana in general, please see docs: <https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-ad-hoc-filters>

Ad hoc variables are special case regarding how they are created and used. Some issues related with ad hoc variables user experience come from Grafana limitations. For more info on ad hoc variable-related problems see documentation section **Ad Hoc variable limitations and issues**.

Ad hoc variables are currently required to have specific naming format to work properly.

For creating ad hoc variable, in the name field user needs to input `<variableName>__<tableId>` (double underscore in between `<variableName>` and `<tableId>`). Optionally, additional `__<tableId>`s can be added.

- `<variableName>` can be whatever user finds convenient.
- `<tableId>`(s) is/are the ID(s) of table(s) on TEMS (same as in CMS SQL sentence `SELECT ... FROM <applicationCode>.<tableId>`).

On dashboard page ad hoc variable dropdown will contain names of attributes belonging to that/those attribute group(s) matching specified `<tableId>`(s).

E.g.1.

> `myAdhoc__ASCPUUTIL`. This ad hoc filter will have a list of attributes from attribute group `Address Space CPU Utilization` (table `ASCPUUTIL`).

E.g.2.

> `myAdhoc__ASCPUUTIL__REALTHDA__REALSTOR`. This ad hoc filter would contain attributes from all three attribute groups.

## 3. Referencing variables in query editor

Most variables require user to manually interpolate them in according fields in query editor. **Ad hoc** variables do not need that, they are automatically applied to query before it is sent to server.

### 3.1. Variable syntax

Generally OMEGAMON datasource plugin query editor supports such field values:

1. hardcoded characters (e.g. `123`, `'abc123'`)
2. single variable
3. multiple variables
4. combination of variables and hardcoded characters

#### 3.1.1. Single variable

To apply any type (except **ad hoc**) of variable in any field, the following syntax options can be used:

1. `$<variableName>`
2. `${<variableName>}`

#### 3.1.2. Multiple variables and/or hardcoded characters

The further templates work only for string fields, not numeric fields.

Optionally variable can be used as a part of field value, while some other part(s) are hardcoded characters:

1. `'<something>${<variableName>}'`
2. `'${<variableName>}<something>'`
3. `'<something>${<variableName>}<something>'`

Furthermore, multiple variables can be interpolated in same field value:

1. `'${<variableName1>}${<variableName2>}'`
2. `'${<variableName1>}${<variableName2>}${<variableName3>}'`
3. ...

Lastly, field value can potentially contain multiple variables and multiple hardcoded parts:

1. `'${<variableName1>}${<variableName2>}<something>'`
2. `'${<variableName1>}<something>${<variableName2>}'`
3. `'<something>${<variableName1>}${<variableName2>}'`
4. `'${<variableName1>}<something>${<variableName2>}<something>'`
5. `'<something>${<variableName1>}${<variableName2>}<something>'`
6. `'<something>${<variableName1>}<something>${<variableName2>}<something>'`
7. ...

### 3.2. Variable use in specific fields

Variables can be used in the following OMEGAMON datasource plugin query editor fields:

1. `Managed systems` (agents and groups)
2. `System.Parma`'s (value fields)
3. `Filters` (attribute value fields)
4. `Formula` (column & SYSTEM.PARMA values in WHERE clause; `Formula` editor contains CMS SQL representation of query, having hardcoded values and templates with variables from all according form fields)

#### 3.2.1. `Managed systems` and `System.Parma`

`Managed systems` and `System.Parma` fields supports any kind of values - fully hardcoded, referencing single variable, multiple variables, or variables combined with hardcoded characters.

E.g.

> `'${db2id}:${smfid}:DB2'` template consists of variable `db2id`, then hardcoded character `:`, and then another variable `smfid` followed by hardcoded characters `:DB2`.

#### 3.2.2. `Filters`

The way variables can be used in `Filters` depends on the type of attribute being filtered.

**String Attributes**: any kind of values are allowed for **string** attributes, including different combinations of variables and hardcoded values.

E.g.:

> `"Location" LIKE "${prefix}${suffix}"`

**Numerical Attributes**: use either a single variable or a hardcoded value.

E.g.:

> `"CPU Time" > $cpuTime`

## 4. Resulting queries with variables applied

Before query is sent to TEMS, variables are applied to the query.

The following examples will show variable names, their selected values, fields using those variables and how applying them affects query.

### 4.1. Single variable with single selected value

E.g.:

> Variable:
>
> - `myVariable`: `50`
>
> Field:
>
> - Filters: `CPU Percent` > `$myVariable`
>
> Result:
>
> - attribute `CPU Percent` value has to be higher than `50`

### 4.2. Single variable with multiple selected values

If user has selected multiple values in a variable, the query will return results that match every selected variable value.

E.g.:

> Variable:
>
> - `myVariable`: `T0111111`, `T0222222`
>
> Field:
>
> - Filters: `JESJOBID` = `$myVariable`
>
> Result:
>
> - attribute `JESJOBID` value has to be either `T0111111` or `T0222222`

### 4.3. Multiple variables with multiple selected values

In rare cases some query field may have multiple variables interpolated (and possibly some hardcoded characters), and (some/all of) those variables may have multiple values selected.

E.g. 1:

> Variables:
>
> - `db2id`: `IAA1`, `IBB2`, `ICC3`
> - `mvsid`: `RSD1`, `RSD2`
>
> Field:
>
> - Managed systems: `${db2id}:${mvsid}:DB2`
>
> Result:
>
> - managed system has to be either:
>   - `IAA1:RSD1:DB2`
>   - `IBB2:RSD1:DB2`
>   - `ICC3:RSD1:DB2`
>   - `IAA1:RSD2:DB2`
>   - `IBB2:RSD2:DB2`
>   - `ICC3:RSD2:DB2`

E.g. 2:

> Variables:
>
> - `prefix`: `OMPE`, `AXR`
> - `id`: `1`, `2`, `3`
>
> Field:
>
> - Filters: `Job Name` = `${prefix}${id}`
>
> Result:
>
> - attribute `Job Name` value has to be either:
>   - `OMPE1`
>   - `OMPE2`
>   - `OMPE3`
>   - `AXR1`
>   - `AXR2`
>   - `AXR3`

### 4.4. Single variable with default ALL option selected

The following examples will explain how variable's ALL option is applied to query (if no custom ALL value is specified in variable's configuration).

#### 4.4.1. In `Filters` field

In case user selected ALL option for variable used in `Filters` field (filtering by attribute), the query will not filter data by that attribute.

E.g.:

> Variable:
>
> - `myVariable`: ALL
>
> Field:
>
> - Filters: `Type` = `$myVariable`
>
> Result:
>
> - attribute `Type` value does not matter

#### 4.4.2. In `Managed systems` field

In case user selected default ALL option in a variable that is applied in `Managed systems`, the query will request metrics from all agents that are in default group for that application (see **Appendix** section for full list of default Managed Systems groups).

E.g.:

> Variable:
>
> - `myVariable`: ALL
>
> Field:
>
> - Managed systems: `$myVariable`
>
> Result:
>
> - managed system has to be within group `*MVS_SYSTEM`

### 4.5. Single variable with custom ALL option selected

If user has set a custom value to ALL option, then selecting ALL will apply that custom value to the query.

Let's say, user has a few specific agents that they're interested in and created a `*MY_GROUP` group of those agents on TEMS. In variable settings user has assigned custom ALL value to be `*MY_GROUP`.

E.g.:

> Variable:
>
> - `myVariable`: ALL (custom value `*MY_GROUP`)
>
> Field:
>
> - Managed systems: `$myVariable`
>
> Result:
>
> - managed system has to be within group `*MY_GROUP`

### 4.6. Multiple variables with default ALL option selected

#### 4.6.1. In `Managed systems` field

If default ALL option is used in any of interpolated variables in `Managed systems` field template, then the template is replaced with default Managed System group for that application (see **Appendix** for full list of default groups).

E.g.:

> Variables:
>
> - `db2id`: ALL
> - `mvsid`: `RSD1`, `RSD2`
>
> Field:
>
> - Managed systems: `${db2id}:${mvsid}:DB2`
>
> Result:
>
> - managed system has to be within group `*MVS_DB2`

#### 4.6.2. In `Filters` field

If default ALL option is used for variable in `Filters` template containing more than that variable, then error is displayed, as this is not allowed.

E.g.:

> Variables:
>
> - `prefix`: ALL
> - `id`: `1`, `2`, `3`
>
> Field:
>
> - Filters: `${prefix}${id}`
>
> Result:
>
> - error when sending query: `The provided template "${prefix}${id}" does not match the expected format for variables with value "All"`

### 4.7. Multiple variables with custom ALL option selected

When custom ALL option is selected, the custom value is interpolated as if it was a simple selected value.

E.g.:

> Variables:
>
> - `prefix`: `OMPE`, `AXR`
> - `id`: ALL (custom value `*`)
>
> Field:
>
> - Filters: `Job Name` LIKE `${prefix}${id}`
>
> Result:
>
> - attribute `Job Name` text has to start with either `OMPE*` or `AXR*`

### 4.8. Ad hoc variable

Ad hoc variables are automatically applied to query before it is sent to TEMS and do not require to be used in query editor.

E.g.:

> Variable:
>
> - `myAdhoc__ASCPUUTIL`: `Job Name` = `S3QA28DS`
>
> Result:
>
> - attribute `Job Name` value has to be `S3QA28DS`

### 4.9. Variables in `Filters` containing multiple conditions

The following examples will illustrate some of the cases of how applying variables affects filtering by multiple attributes. In some cases the resulting query condition will be presented as SQL clause for simplicity sake.

E.g. 1.:

> Variable:
>
> - `cpuTime`: `0`
>
> Filters:
>
> ```SQL
> 'Enclave CPU Time' > 0.01
> OR
> 'In DB2 CP CPU Time' > ${cpuTime}
> ```
>
> Result:
>
> ```SQL
> 'Enclave CPU Time' > 0.01
> OR
> 'In DB2 CP CPU Time' > 0
> ```

E.g. 2.:

> Variable:
>
> - `cpuTime`: ALL
>
> Filters:
>
> ```SQL
> 'Enclave CPU Time' > 0.01
> OR
> 'In DB2 CP CPU Time' > ${cpuTime}
> ```
>
> Result:
>
> - attribute values do not matter

E.g. 3.:

> Variable:
>
> - `cpuTime`: ALL
> - `smfId`: `RS22`
>
> Filters:
>
> ```SQL
> (
>   'Enclave CPU Time' > 0.01
>   OR
>   'In DB2 CP CPU Time' > ${cpuTime}
> )
> AND
> 'MVS ID' = ${smfId}
> ```
>
> Result:
>
> ```SQL
> 'MVS ID' = 'RS22'
> ```

E.g. 4.:

> Variable:
>
> - `cpuTime`: `0`
> - `smfId`: `RS22`, `RS25`
>
> Filters:
>
> ```SQL
> (
>   'Enclave CPU Time' > 0.01
>   OR
>   'In DB2 CP CPU Time' > ${cpuTime}
> )
> AND
> 'MVS ID' = ${smfId}
> ```
>
> Result:
>
> ```SQL
> (
>   'Enclave CPU Time' > 0.01
>   OR
>   'In DB2 CP CPU Time' > 0
> )
> AND
> (
>   'MVS ID' = 'RS22'
>   OR
>   'MVS ID' = 'RS25'
> )
> ```

## 5. Ad hoc variables limitations

Ad hoc variables currently have a couple of problems due to Grafana limitations.

### 5.1. No ORIGINNODE column

Ad hoc variable dropdowns do not contain `ORIGINNODE` column. It is advised to use separate query variable for filtering by Managed Systems.

### 5.2. Ad hoc variables sharing same columns

If dashboard contains multiple ad hoc variables, then each ad hoc variable dropdown will contain **all** columns from **all** tables that are in **all** ad hoc variables names in that dashboard.

E.g.:

> If dashboard contains two ad hoc variables `myAdhoc__DB2CONN__CA1SUM` and `myAdhoc__CICSICE`. Then dropdown for `myAdhoc__DB2CONN__CA1SUM` will contain attributes from tables `DB2CONN`, `CA1SUM`, `CICSICE` & dropdown for `myAdhoc__CICSICE` will also contain attributes from tables `DB2CONN`, `CA1SUM`, `CICSICE`.

### 5.3. Duplicate columns due to case-sensitivity

Another problem is that ad hoc variable dropdown may contain same column mentioned more than one time, if that column's name in multiple tables is same, but has different case characters.

E.g. 1:

> If dashboard contains single ad hoc variable `myAdhoc__REALTHDA__KAGDYST`, then dropdown (among other attributes) will contain `Transaction ID` and `Transaction Id`.

E.g. 2:

> If dashboard contains two ad hoc variables `myAdhoc__REALTHDA` & `myAdhoc__KAGDYST`, then for each of them dropdown (among other attributes) will contain `Transaction ID` and `Transaction Id`.

### 5.4. Filtering by column name instead of column meaning

If two columns A and B have same meaning, but different name, filtering by column A will not filter by column B.

E.g.:

> SMF ID column on table `REALTHDA` is named `MVS ID`, while on table `DBM1STO` - `MVS System`. Let's say, dashboard has ad hoc variable `myAdhoc__REALTHDA__DBM1STO` and also 2 table panels. One panel is showing metrics for table `REALTHDA`, another for table `DBM1STO`. Now, in ad hoc variable user selects column `MVS ID = RS22`. In such case panel that shows metrics for table `REALTHDA` will be filtered to show only those rows where `MVS ID` value is `RS22`. However, rows on another panel will not be filtered.

### 5.5. Searching by column ID does not work (OMUI5-572)

E.g.:

> Dashboard has ad hoc variable `myAdhoc__REALTHDA`. In dropdown searchable field user inputs `MVSID` (ID of column). Dropdown shows "No options found". However, if user changes input to `MVS ID` (name of attribute), then dropdown contains this attribute.

## 6. Appendix

### 6.1. Default Managed System Groups

| Application                 | Default Group                    | Affinity ID      |
| --------------------------- | -------------------------------- | ---------------- |
| MVS CICS                    | \*MVS_CICS                       | %IBM.STATIC011   |
| CICSplex                    | \*IBM_CICSplex                   | %IBM.CICSplex    |
| MVS CICSTG                  | \*MVS_CICSTG                     | %IBM.STATIC115   |
| IMS Subsystems              | \*MVS_IMSPLEX                    | %IBM.STATIC014   |
| JVM                         | \*JVM_Monitor                    | %IBM.JVM_Monitor |
| MQ Queue Manager            | \*MVS_MQM                        | %IBM.STATIC022   |
| MQ Queue Sharing Group      | \*MQ_QSG                         | %IBM.STATIC163   |
| Integration Bus Broker Node | \*MQSI_BROKER_V7                 | %IBM.STATIC154   |
| Integration Bus Agent       | \*MQSI_AGENT                     | %IBM.STATIC128   |
| Mainframe Networks          | \*OMEGAMONXE_MAINFRAME_NTWK      | %IBM.STATIC150   |
| TCP/IP                      | \*OMEGAMONXE_MAINFRAME_NTWK_TCP  | %IBM.STATIC149   |
| VTAM                        | \*OMEGAMONXE_MAINFRAME_NTWK_VTAM | %IBM.STATIC148   |
| DB2 Subsystems              | \*MVS_DB2                        | %IBM.STATIC017   |
| zOS SYSPLEX                 | \*MVS_SYSPLEX                    | %IBM.STATIC006   |
| zOS SYSTEM                  | \*MVS_SYSTEM                     | %IBM.STATIC007   |
| Storage Subsystem           | \*OMEGAMONXE_SMS                 | %IBM.STATIC139   |
| CQM                         | \*IBM_KQQ                        | %IBM.KQQ         |
| ZVM and Linux               | \*OMXE_VM                        | %IBM.STATIC101   |
