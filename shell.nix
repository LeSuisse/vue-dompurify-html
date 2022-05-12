{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/d2fc6856824cb87742177eefc8dd534bdb6c3439.tar.gz";
    sha256 = "sha256:18nmpsna8lmqcmag2x0gfncd96rrvxgsgn4r7wyagdjymbhzmx2a";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-18_x
  ];
}