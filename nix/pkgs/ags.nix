{
  pkgs,
  makeBinPath,
  glib,
  gjs,
  ags,
  astal,
  ...
}:

pkgs.mkDerivation {
  pname = "shell";
  src = ../../config/ags;

  nativeBuildInputs = with pkgs; [
    wrapGAppsHook
    gobject-introspection
    ags.packages.${pkgs.system}.default
  ];

  buildInputs = [
    glib
    gjs
    astal.io
    astal.astal4
    astal.apps
    astal.auth
    astal.battey
    astal.bluetooh
    astal.cava
    astal.greet
    astal.mpris
    astal.network
    astal.notifd
    astal.tray
    astal.wireplumber
  ];

  installPhase = ''
    ags bundle app.ts $out/bin/shell
  '';

  preFixup = ''
    gappsWrapperArgs+=(
      --prefix PATH : ${
        makeBinPath ([
          # runtime executables
        ])
      }
    )
  '';
}
