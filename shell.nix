{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/85deee6d6c8127d360096a5caa0aeb876b976496.tar.gz";
    sha256 = "sha256:01b1wjmwyl3n15mvk2i1bfb3zjx4yc6wac3274gbvi8h43a1wk5q";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim-18_x
    pkgs.nodePackages.pnpm
  ];
}