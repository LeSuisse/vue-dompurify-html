{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/7f9be6a505a31f88499c5d20d11f98accf5ae6ba.tar.gz";
    sha256 = "sha256:147wp515k1x08blm3nn2z994wbdnbl0vhp472ym1habfihfr7x65";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim-18_x
    pkgs.nodePackages.pnpm
  ];
}