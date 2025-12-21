{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/7d853e518814cca2a657b72eeba67ae20ebf7059.tar.gz";
    sha256 = "sha256:0hsqizh6kqp27gywdl33rpjclz8lls8s757qwa5qkbjb9an0dxlp";
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
