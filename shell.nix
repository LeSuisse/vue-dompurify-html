{ pkgs ? import (
  fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/e35699dd5791cee79fe050cb1f83e30f3f3b7789.tar.gz";
    sha256 = "0acs92dmh8yd9kxmr7k28zbsxysj4k8k75da0kkf1r7vnr56yagz";
  }
) {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-slim-18_x
    pkgs.nodePackages.pnpm
  ];
}