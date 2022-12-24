// if POETRY_PUBLISH is not set, publish the package if a PYPI_TOKEN is provided
const POETRY_PUBLISH =
  (process.env.POETRY_PUBLISH !== undefined &&
    process.env.POETRY_PUBLISH === "true") ||
  process.env.PYPI_TOKEN !== undefined;

const config = {
  // https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration
  branches: [
    { name: "main" },
    { name: "next" },
    { name: "+([0-9])?(.{+([0-9]),x}).x" },
    // { name: "dev", prerelease: true },
    { name: "beta", prerelease: true },
    { name: "alpha", prerelease: true },
  ],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "# Changelog",
      },
    ],
    [
      "@cihelper/semanticrelease-plugin-poetry",
      {
        publishPoetry: POETRY_PUBLISH,
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "dist/*.tar.gz", label: "sdist" },
          { path: "dist/*.whl", label: "wheel" },
        ],
        failComment: false,
        addReleases: "bottom",
      },
    ],
    [
      "@semantic-release/git",
      {
        message: "chore(release): ${nextRelease.version}",
        assets: ["pyproject.toml", "*/__init__.py", "CHANGELOG.md"],
      },
    ],
  ],
};

module.exports = config;
