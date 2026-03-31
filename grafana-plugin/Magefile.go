//go:build mage
// +build mage

package main

import (
	"runtime"

	"github.com/grafana/grafana-plugin-sdk-go/build"
	"github.com/magefile/mage/mg"
)

var b = build.Build{}

func SetDatasourceConfigPaths(cfg build.Config) (build.Config, error) {
	cfg.OutputBinaryPath = "dist/datasource"
	cfg.PluginJSONPath = "src/datasource"
	cfg.RootPackagePath = "./pkg/datasource"
	return cfg, nil
}

func getFalconBuildTarget(
	sdkTarget func() error,
	callback func(cfg build.Config) (build.Config, error),
) func() error {
	return func() error {
		err := build.SetBeforeBuildCallback(callback)
		if err != nil {
			return err
		}
		return sdkTarget()
	}
}

type Falcon mg.Namespace

// Builds falcon binaries for Linux
func (Falcon) Linux() {
	mg.Deps(getFalconBuildTarget(b.Linux, SetDatasourceConfigPaths))
}

// Builds falcon binaries for Linux ARM
func (Falcon) LinuxARM() {
	mg.Deps(getFalconBuildTarget(b.LinuxARM, SetDatasourceConfigPaths))
}

// Builds falcon binaries for Linux ARM64
func (Falcon) LinuxARM64() {
	mg.Deps(getFalconBuildTarget(b.LinuxARM64, SetDatasourceConfigPaths))
}

// Builds falcon binaries for Windows
func (Falcon) Windows() {
	mg.Deps(getFalconBuildTarget(b.Windows, SetDatasourceConfigPaths))
}

// Builds falcon binaries for Darwin (aka MacOS)
func (Falcon) Darwin() {
	mg.Deps(getFalconBuildTarget(b.Darwin, SetDatasourceConfigPaths))
}

// Builds falcon binaries for Darwin ARM64 (aka MacOS)
func (Falcon) DarwinARM64() {
	mg.Deps(getFalconBuildTarget(b.DarwinARM64, SetDatasourceConfigPaths))
}

// Builds binary for linux s390x
func (Falcon) LinuxS390X() {
	mg.Deps(
		getFalconBuildTarget(
			b.Linux,
			func(cfg build.Config) (build.Config, error) {
				newCfg, err := SetDatasourceConfigPaths(cfg)
				if err != nil {
					return newCfg, err
				}
				newCfg.OS = "linux"
				newCfg.Arch = "s390x"
				return newCfg, nil
			},
		),
	)
}

// Builds binary for the systems architecture
func (Falcon) Backend() {
	mg.Deps(getFalconBuildTarget(b.Backend, SetDatasourceConfigPaths))
}

// Builds falcon binaries for Linux inside Docker container
func (Falcon) DockerLinux() {
	if runtime.GOOS == "darwin" {
		mg.Deps(getFalconBuildTarget(b.LinuxARM64, SetDatasourceConfigPaths))
	} else {
		mg.Deps(getFalconBuildTarget(b.Linux, SetDatasourceConfigPaths))
	}
}

func (Falcon) GenerateManifestFile() {
	mg.Deps(getFalconBuildTarget(b.GenerateManifestFile, SetDatasourceConfigPaths))
}

func (Falcon) Test() {
	mg.Deps(build.Test)
}

func (Falcon) Coverage() {
	mg.Deps(build.Coverage)
}

func (Falcon) Clean() {
	mg.Deps(build.Clean)
}

// Builds falcon binaries for all platforms
func (Falcon) BuildAll() {
	mg.Deps(
		Falcon.Linux,
		Falcon.LinuxARM,
		Falcon.LinuxARM64,
		Falcon.LinuxS390X,
		Falcon.Windows,
		Falcon.Darwin,
		Falcon.DarwinARM64,
		Falcon.GenerateManifestFile,
	)
}

// Default configures the default target.
var Default = Falcon.BuildAll
