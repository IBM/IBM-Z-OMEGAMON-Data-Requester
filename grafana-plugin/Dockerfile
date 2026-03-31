FROM wal-artifactory.rocketsoftware.com:6595/golang:1.25.1 AS backend

RUN cd /usr/local &&\
    git clone https://github.com/magefile/mage &&\
    cd mage &&\
    go run bootstrap.go

WORKDIR /workspace/apps/grafana-plugin

# TODO OMUI5-1150
COPY ./apps/grafana-plugin/go.mod ./apps/grafana-plugin/go.sum ./

COPY ./apps/grafana-plugin/src/datasource/plugin.json ./src/datasource/
COPY ./apps/grafana-plugin/src/plugin.json ./src/
COPY ./apps/grafana-plugin/Magefile.go ./
COPY ./apps/grafana-plugin/pkg ./pkg

ENV GOCACHE=/go/pkg/mod
ENV MAGEFILE_CACHE=/root/.cache/go-build

RUN --mount=type=cache,target=/root/.cache/go-build --mount=type=cache,target=/go/pkg/mod mage -v && mage -v falcon:test


FROM wal-artifactory.rocketsoftware.com:6595/node:18 AS frontend

RUN corepack enable

RUN npm i -g --force pnpm@9.15.4

# FYI:
# Dependency installation is done prior to copying all code to take advantage Docker's layer caching.
# If package.json didn't change, Docker will reuse cached layer and avoid reinstalling dependencies
# every time when building image, allowing build to finish quicker.

WORKDIR /workspace

# TODO OMUI5-1150

# Copy all files that regulate dependencies
COPY ./.npmrc ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./
COPY ./packages/public-common/package.json ./packages/public-common/pnpm-lock.yaml ./packages/public-common/
COPY ./packages/public-domain/package.json ./packages/public-domain/pnpm-lock.yaml ./packages/public-domain/
COPY ./packages/public-ui/package.json ./packages/public-ui/pnpm-lock.yaml ./packages/public-ui/
COPY ./packages/devtools-configs/package.json ./packages/devtools-configs/pnpm-lock.yaml ./packages/devtools-configs/
COPY ./apps/grafana-plugin/pnpm-lock.yaml ./apps/grafana-plugin/package.json ./apps/grafana-plugin/

# Install all grafana-plugin-related dependencies 
# Including devDependencies, to verify code before build.
# However, built package does not contain devDependencies, because Webpack excludes them.
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --store-dir=/pnpm/store 

# Copy all grafana-plugin-related files

COPY ./packages/ ./packages

# By copying all contents of grafana-plugin build time is increased
# since if any file here was modified we rebuild frontend
# it was decided to use this approach and maybe improve on it
# by copying only the needed components for the build
COPY ./apps/grafana-plugin ./apps/grafana-plugin

ARG FALCON_BUILD_NUMBER

# Verify code and build
# Since build number always changes, this will cause "cache miss"
RUN pnpm grafana-plugin:verifyAndBuildTs


FROM wal-artifactory.rocketsoftware.com:6595/alpine:3.22.1 AS merger

RUN apk update && apk add --no-cache rsync

COPY --from=backend /workspace/apps/grafana-plugin/dist /backend/dist
COPY --from=frontend /workspace/apps/grafana-plugin/dist /frontend/dist

WORKDIR /dist
RUN rsync -av /backend/dist/ ./ &&\
    rsync -av /frontend/dist/ ./


FROM scratch AS exporter

COPY --from=merger /dist /omegamon-app/