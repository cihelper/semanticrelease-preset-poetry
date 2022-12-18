const config = {
  // https://semantic-release.gitbook.io/semantic-release/usage/workflow-configuration
  branches: [
    { name: "main" },
    { name: "next" },
    { name: "+([0-9])?(.{+([0-9]),x}).x" },
    { name: "dev", prerelease: true },
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
      "@semantic-release/exec",
      {
        prepareCmd:
          "poetry version ${nextRelease.version} && poetry build --no-interaction -vvv",
        publishCmd:
          'if [ -n "$PYPI_TOKEN" ]; then poetry publish --username __token__ --password $PYPI_TOKEN --no-interaction -vvv; fi',
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          { path: "dist/*.tar.gz", label: "sdist" },
          { path: "dist/*.whl", label: "wheel" },
        ],
        // failComment: false,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: ["pyproject.toml", "*/__init__.py", "CHANGELOG.md"],
      },
    ],
  ],
};

module.exports = config;
