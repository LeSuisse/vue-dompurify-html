{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/e1d501922fd7351da4200e1275dfcf5faaad1220.tar.gz";
    sha256 = "sha256:085jmvkr1r1ag18mp2skf9nrap3i3gwphlf7zaagwfh9q11lj13l";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim
    pkgs.nodePackages_latest.pnpm
    pkgs.cacert
    pkgs.ps
  ];
}