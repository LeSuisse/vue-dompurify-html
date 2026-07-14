{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/6cdc7fc76e8bf7fde9fa43a849fcaaa70e230dee.tar.gz";
    sha256 = "sha256-FmieJB8/OUvNxbkboi7+IGfIuSXY3nF/hZQm8kD0r50=";
  }
) {} }:

pkgs.mkShellNoCC {
  buildInputs = [
    pkgs.nodejs-slim
    pkgs.pnpm
    pkgs.cacert
    pkgs.ps
  ];

  NODE_OPTIONS = "--experimental-strip-types";
}
