{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/2362848adf8def2866fabbffc50462e929d7fffb.tar.gz";
    sha256 = "0wjr874z2y3hc69slaa7d9cw7rj47r1vmc1ml7dw512jld23pn3p";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim-18_x
    pkgs.nodePackages.pnpm
  ];
}