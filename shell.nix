{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/8edc0c72e3a38faf5434e40d1f19431125fe4b30.tar.gz";
    sha256 = "sha256-tqM7xDEsaeK1p6VvRygeZ9LkQRpUUkbRT02BHv6hnTM=";
  }
) {} }:

pkgs.mkShellNoCC {
  buildInputs = [
    pkgs.nodejs-slim
    pkgs.pnpm
    pkgs.cacert
    pkgs.ps
  ];
}
