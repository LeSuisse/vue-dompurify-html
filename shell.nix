{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/9356eead97d8d16956b0226d78f76bd66e06cb60.tar.gz";
    sha256 = "1f6gqsm9f8hx3sf5a66iih619bfzzvs5xdval3p807ad8a1zwmbq";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim-18_x
    pkgs.nodePackages.pnpm
  ];
}