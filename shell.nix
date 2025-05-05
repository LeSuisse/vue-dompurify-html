{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/6b1c028bce9c89e9824cde040d6986d428296055.tar.gz";
    sha256 = "sha256:02zz81ni61y53mrgd42r0fgpwg26rsn098a1100zdx5h9558l6al";
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
