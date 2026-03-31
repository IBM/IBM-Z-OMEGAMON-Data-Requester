# Architecture proposal

WIKI URI: https://wiki.rocketsoftware.com/display/OMUI5/Backend+Architecture+Approach

Filesystem structure:

- domain (move it out of features so we won't need to create `types` directory in each feature)
- endpoints (instead of `api`)
- features (instead of `components`, no `core` directiry)
- generic
- infrastructure
- plugin
- ports
