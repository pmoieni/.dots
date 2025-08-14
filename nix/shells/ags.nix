{
  pkgs,
  ags,
  system,
  ...
}:
pkgs.mkShell {
  buildInputs = [
    (ags.packages.${system}.default.override {
      extraPackages = [
        # cherry pick packages
      ];
    })
  ];
}
