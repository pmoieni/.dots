{
  pkgs,
  ags,
  system,
  ...
}:
let
  astalPackages = with ags.packages.${system}; [
    io
    astal4
    apps
    auth
    battery
    bluetooth
    cava
    greet
    mpris
    network
    notifd
    tray
    wireplumber
  ];

  extraPackages = astalPackages ++ [
    pkgs.libadwaita
    pkgs.libsoup_3
  ];
in
pkgs.mkShell {
  buildInputs = [
    (ags.packages.${system}.default.override {
      inherit extraPackages;
    })
  ];
}
