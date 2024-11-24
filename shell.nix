{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/8edf06bea5bcbee082df1b7369ff973b91618b8d.tar.gz";
    sha256 = "sha256:0zwkwkiifcbzsmfn932nkgvhaj91n3hqg05fqss8s79bdwk6w35i";
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
