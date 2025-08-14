{
  pkgs,
  ags,
  astal,
  ...
}:
{
  ags = pkgs.callPackage ./ags.nix {
    inherit ags astal;
  };
}
