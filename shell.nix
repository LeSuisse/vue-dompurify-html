{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/de0fe301211c267807afd11b12613f5511ff7433.tar.gz";
    sha256 = "sha256:0lw17azfdh3gmh75ddha01j4c7fn38nz4w3jwzbaz0ngb8nchb3a";
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
