{
  pkgs,
  ags,
  system,
  ...
}:
{
  default = pkgs.mkShell { };
  ags = pkgs.callPackage ./ags.nix {
    inherit pkgs ags system;
  };
}
