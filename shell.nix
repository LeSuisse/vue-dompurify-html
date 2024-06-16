{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/3f84a279f1a6290ce154c5531378acc827836fbb.tar.gz";
    sha256 = "sha256:1qpvazfxh036ngm2xd1bgnshfrx0rrb9n0wrzf3dfq8h6v8c0mxv";
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
