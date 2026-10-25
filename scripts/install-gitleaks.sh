#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
version=8.30.1
case "$(uname -s)-$(uname -m)" in
  Linux-x86_64) platform=linux_x64; checksum=551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb ;;
  Linux-aarch64|Linux-arm64) platform=linux_arm64; checksum=e4a487ee7ccd7d3a7f7ec08657610aa3606637dab924210b3aee62570fb4b080 ;;
  Darwin-x86_64) platform=darwin_x64; checksum=dfe101a4db2255fc85120ac7f3d25e4342c3c20cf749f2c20a18081af1952709 ;;
  Darwin-arm64) platform=darwin_arm64; checksum=b40ab0ae55c505963e365f271a8d3846efbc170aa17f2607f13df610a9aeb6a5 ;;
  *) echo 'Unsupported platform. On Windows, use WSL.' >&2; exit 1 ;;
esac
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
archive="gitleaks_${version}_${platform}.tar.gz"
curl --fail --silent --show-error --location --retry 3 \
  "https://github.com/gitleaks/gitleaks/releases/download/v${version}/${archive}" -o "$tmp/$archive"
if command -v sha256sum >/dev/null; then
  actual=$(sha256sum "$tmp/$archive" | cut -d ' ' -f 1)
else
  actual=$(shasum -a 256 "$tmp/$archive" | cut -d ' ' -f 1)
fi
if [ "$actual" != "$checksum" ]; then
  echo 'Gitleaks checksum mismatch; installation aborted.' >&2
  exit 1
fi
tar -xzf "$tmp/$archive" -C "$tmp" gitleaks
mkdir -p .tools
install -m 755 "$tmp/gitleaks" .tools/gitleaks
.tools/gitleaks version
