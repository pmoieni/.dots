{ pkgs, ... }:

let
  inherit (builtins)
    attrNames
    filter
    listToAttrs
    readDir
    ;

  inherit (pkgs) lib;
  inherit (lib) attrsets strings;

  commonBuildInputs = [ ];
in

{
  default = pkgs.mkShell {
    nativeBuildInputs = commonBuildInputs;
  };
}
// (
  readDir ./.
  |> attrNames
  |> filter (strings.hasSuffix ".nix")
  |> map (strings.removeSuffix ".nix")
  |> filter (filename: filename != "default")
  |> map (
    filename:
    attrsets.nameValuePair filename (
      pkgs.callPackage ./${filename}.nix {
        inherit commonBuildInputs;
      }
    )
  )
  |> listToAttrs
)
