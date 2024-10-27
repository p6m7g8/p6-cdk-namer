#!/bin/bash

# shellcheck shell=bash
main() {
  local latest_tag=$(git describe --tags --abbrev=0)

  local major=$(echo $latest_tag | cut -d. -f1)
  local minor=$(echo $latest_tag | cut -d. -f2)
  local patch=$(echo $latest_tag | cut -d. -f3)

  if git log -1 --pretty=%B | grep -q "BREAKING CHANGE"; then
    major=$((major + 1))
    minor=0
    patch=0
  elif git log -1 --pretty=%B | grep -q "major"; then
    major=$((major + 1))
    minor=0
    patch=0
  elif git log -1 --pretty=%B | grep -q "feat"; then
    minor=$((minor + 1))
    patch=0
  elif git log -1 --pretty=%B | grep -q "fix"; then
    patch=$((patch + 1))
  else
    patch=$((patch + 1))
  fi

  local new_tag="$major.$minor.$patch"
  echo "New semantic version tag: $new_tag"
  npm version $new_tag --no-git-tag-version

  echo $new_tag >dist/releasetag.txt
  git log $latest_tag..HEAD --pretty=format:"- %s" >dist/changelog.md

}

main "$@"
