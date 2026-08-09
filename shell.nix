{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/70ce234312134a463ba7728e94da2486a1d237ac.tar.gz";
    sha256 = "sha256-X44cn5rzytELc3NNoQsh0aLkjWA/QzPfc6HPQmsG3sU=";
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
