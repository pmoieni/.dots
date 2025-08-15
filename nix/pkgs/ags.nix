{
  pkgs,
  ags,
  system,
  ...
}:
let
  pname = "shell";
  entry = "./app.ts";

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
pkgs.stdenv.mkDerivation {
  name = pname;
  src = ./.;

  nativeBuildInputs = with pkgs; [
    wrapGAppsHook
    gobject-introspection
    ags.packages.${pkgs.system}.default
  ];

  buildInputs = extraPackages ++ [ pkgs.gjs ];

  installPhase = ''
    runHook preInstall

    mkdir -p $out/bin
    mkdir -p $out/share
    cp -r * $out/share
    ags bundle ${entry} $out/bin/${pname} -d "SRC='$out/share'"

    runHook postInstall
  '';
}
