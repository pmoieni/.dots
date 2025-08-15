{
  pkgs,
  ags,
  astal,
  system,
  ...
}:
{
  ags = pkgs.callPackage ./ags.nix {
    inherit
      pkgs
      ags
      astal
      system
      ;
  };
}
