{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/c6ffce3d5df7b4c588ce80a0c6e2d2348a611707.tar.gz";
    sha256 = "15pdl53q06dsxwnix191mrkwzh21sb7yqrmz2qq6q25qk8hdpjrr";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim
    pkgs.nodePackages_latest.pnpm
    pkgs.ps
  ];
}