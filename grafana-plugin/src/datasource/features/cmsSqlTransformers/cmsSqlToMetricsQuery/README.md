# CMS SQL Parser

## High-level overview

Parsing process consist of 3 steps: tokenization, parsing to CMS SQL [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) and finally converting AST to `FalconMetricsQuery` structure. First 2 steps form a classic parser and third is required to make code a bit more modular. `FalconMetricsQuery` is supposed to change relatively often so it's better to keep code that relies on it as small as possible.

## Known limitations

Unsupported:

- _UNION_
- Non-_SELECT_ statements
- $DUMMY
- $NODENAME()
- Function calls other than LAST/FIRST/SYSTEM.PARMA

Also,

- Qualified identifiers can have parts separated with whitespaces (`SELECT INODESTS . ORIGINNODE` doesn't generate error and treated as `SELECT INODESTS.ORIGINNODE`)

## Tokenization

This step takes raw CMS SQL string and split it into sequence of tokens. Token is a context-free representation of smallest "addressable" entity of query. For example, `'SELECT ORIGINNODE FROM O4SRV.INODESTS'` will produce sequence of tokens similar to this one:

- `keyword: SELECT`
- `identifier: ORIGINNODE`
- `keyword: FROM`
- `identifier: O4SRV`
- `separator: .`
- `identifier: INODESTS`

The purpose of tokenizer is also to narrow the _kind_ of the token as possible. For example, it is expected to distinguish `OR` and `AND` tokens. In the same time, it's useful to know what _group_ the token belongs to. To solve this, `Token` has 2 properties: `kind` contains as specific token _kind_ as possible while `genericKind` represents more _generalized kind_ of the token. Specific `kind` will be prefixed with `genericKind`: token with `kind: or_connection_operator` has `genericKind: connection_operator`.
This also can be solved by creating a bunch of `isConnectionOperator`-like functions which would be more flexible, but current solution is good enough for now.

Technically, there are 4 types of token matchers:

1. symbolic tokens
2. identifier + keywords matcher
3. literals (string, decimal and hexadecimal)
4. whitespace

### Symbolic tokens

e.g. `>=`, `(`, `*` etc.

Tokens of fixed shape based on non-alpha-numerical characters. Those are matched against their hardcoded patterns. Note: the order in which symbolic tokens are matched is important since one token contain all the symbols of another (e.g. `>=` contains 2 tokens: `>` and `=` but it's a separate token). Because of that, tokens with longer patterns are matched first.

### Keywords

e.g. `SELECT`, `AT`

_Keywords_ are basically alpha-numerical version of _symbolic tokens_. But _keywords_ should be matched as part of _identifiers_ matching because there can be an _identifier_ containing a _keyword_ as a substring (e.i. `ATNT43` contains `AT`). Basically, once tokenizer detects _identifier_ it checks if this _identifier_ is a known _keyword_ or nor.

### Identifiers

e.g. `INODESTS`, `O4SRV`

Alpha-numerical string (that starts with an alpha character). It's _generic kind_ is the same as _specific_ one and is `identifier`.

### Literals

e.g. `42`, `"My fancy text"`

Literals are string or numeric constants. Unlike any other token types, those also have `value` property. For `string_literal` token it will contain unescaped string and for `decimal_` or `hexadecimal_` literals it will contain parsed integer number.

1997 CMS SQL specification defines only defines double quotes as a string literal defining quotes but in practice it looks like both single and double quotes work just perfect. Also, I _think_ CMS SQL uses 2 quote characters to code quote character in string.

Also, specification says hexadecimal literals can only be 2, 4 or 8 characters long.

### Whitespace

Even though it's clear case of _symbolic token_, it was easier to implement a special matcher for whitespace because it doesn't have fixed shape.

## Parsing

Parser itself is a classic recursive descent parser. It goes (almost) once through left to right and tries to match AST nodes to whatever should make sense.

It consists of set of independent `parse{SomeStuff}` functions (`parseSelect`, `parseUnary`,etc). The convention is:

- Function takes an array of tokens.
- It returns a tuple of 2 elements `[AstNode | null, Token[]]`. First element is an `AstNode` if node was successfully parsed or `null` otherwise. Second element is an array of tokens next parsing function is supposed to work with. So it's either array of tokens starting with token followed by last token in parsed node or (in case if node wasn't parsed) an input array of tokens
- It returns (or throws?) the errors _only_ if function is 100% sure it found sequence of tokens that is wrong and cannot be correct representation of other nodes. For example, if `parseSelect` function gets decimal literal instead of `select` keyword, it should return `null` instead of raising the error. But if it found `select` keyword and get literal instead of column identifier - it should raise the error.

## Error handling

**TODO**

### EBNF

#### Basic expressions

Those EBNF definitions are written in top-down order (precedence is increasing down). This is re order parser will try to match AST nodes.

- `filter_expression = or_connection`
- `or_connection = and_connection {"or" and_connection}`
- `and_connection = comparison {"and" comparison}`
- `comparison = arithmetic_expression {("=" | "<>" | ">" | "<" | ">=" | "<=") arithmetic_expression}`
- `arithmetic_expression = addition`
- `addition = multiplication {("+" | "-") multiplication}`
- `multiplication = unary {("*" | "/") unary}`
- `unary = ("+" | "-")unary | expression_primitive` (I'm not sure if CMS SQL supports recursive unary operations)
- `expression_primitive = "("arithmetic_expression")" | function_call | identifier | literal` (Note: it recursively defined through arithmetic expressions instead of filter one)

#### SQL-specific expressions

SQL is strict on clause order so parsing order is hardcoded (this list is random)

- `select_clause = "select" select_item {"," select_item}`
- `select_item = identifier | function_call`
- `function_call = identifier "("[arithmetic_expression {, arithmetic_expression}]")"`
- `identifier = qualified_identifier | unqualified_identifier`
- `qualified_identifier = unqualified_identifier "." unqualified_identifier`
- `unqualified_identifier = (a..zA..Z){a..zA..Z0..9_}`
- ...and so on

## Conversion to FalconMetricsQuery structure

Converter has 2 main goals:

- Validate AST makes sense
- Convert AST to a query object

Converter implementation is mostly straightforward but WHERE clause conversion is tricky.

There is "intermediate" filter representation that is more similar to query object structure rather than AST but still has all the information AST has.
This way code is (usually) simpler. WHERE clause has a lot of special cases: ORIGINNODEs, WRITETIMEs, FIRST\LAST and PARMA function calls.
The main idea of handling them is to process each of those types separately by finding all the instances of given filter type, validating those (both individually and in group) and then removing those nodes from building the "final" filter field of query object (this field is supposed to NOT have any of special case filters).
For example, ORIGINNODE case searches for all the ORIGINNODE filters, makes sure all of them are located on the same level and connected with OR connector (in case if there are more than one of instances) and there is no other filters in given OR connection. Function that does that also returns "commonNode" which is supposed to be removed from filters list. By the rules applied to ORIGINNODE filter, this common node can be either ORIGINNODE filter itself (in case if there is only one ORIGINNODE filter) or OR connection (in case if there are several of those).
