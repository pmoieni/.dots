{ ... }:
{
  projectRootFile = "flake.nix";

  programs.taplo.enable = true;
  programs.nixfmt.enable = true;
  programs.stylua.enable = true;
  programs.gofmt.enable = true;
}
