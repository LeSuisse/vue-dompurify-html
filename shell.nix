{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/5395fb3ab3f97b9b7abca147249fa2e8ed27b192.tar.gz";
    sha256 = "sha256:12gs1hpxhbk20667svfi8p2rd9p1k8hxj065rzx1fpd6jsvg5ks5";
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
