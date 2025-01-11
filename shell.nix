{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/4bc9c909d9ac828a039f288cf872d16d38185db8.tar.gz";
    sha256 = "sha256:0bd0mf9ai0gn3lz0arbmj6zrf7r505la46z86v2nj84a1161v1lw";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim
    pkgs.pnpm
    pkgs.cacert
    pkgs.ps
  ];
}
