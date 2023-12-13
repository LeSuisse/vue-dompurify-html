{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/e97b3e4186bcadf0ef1b6be22b8558eab1cdeb5d.tar.gz";
    sha256 = "sha256:114ggf0xbwq16djg4qql3jljknk9xr8h7dw18ccalwqg9k1cgv0g";
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