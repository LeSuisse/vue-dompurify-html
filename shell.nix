{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/c66ccfa00c643751da2fd9290e096ceaa30493fc.tar.gz";
    sha256 = "1n8mclc9sbi7siq7qhbs9k3jngjpmx54fksa4j2kh4xhlxz1pnr8";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim
    pkgs.nodePackages_latest.pnpm
    pkgs.ps
  ];
}