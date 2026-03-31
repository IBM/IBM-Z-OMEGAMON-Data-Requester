## Reverse format data from human-readable value into raw ITM one

It is covered by `features/formatting/reverseFormat/reverseFormat.ts:13` function.
It applies reverse formatting based on value type from column metadata.

- Timestamp: convert to string with `reverseFormatTimestamp`, return string
- String: get enum value if defined, return string
- Number: get enum value if defined, do reverse scaling if defined, return number
