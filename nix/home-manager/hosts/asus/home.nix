{
  pkgs,
  config,
  ...
}: {
  home.packages = with pkgs; [
    speedtest-cli
    quickshell
  ];

  services.polkit-gnome.enable = true;

  home.file = {
    "${config.xdg.configHome}/alacritty" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/alacritty";
      recursive = true;
    };
    "${config.xdg.configHome}/home-manager" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/home-manager";
      recursive = true;
    };
    "${config.xdg.configHome}/nvim" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/nvim";
      recursive = true;
    };
    "${config.xdg.configHome}/nvim-dev" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/nvim-dev";
      recursive = true;
    };
    "${config.xdg.configHome}/wezterm" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/wezterm";
      recursive = true;
    };
    "${config.xdg.configHome}/zed" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/zed";
      recursive = true;
    };
    "${config.xdg.configHome}/fish" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/fish";
      recursive = true;
    };
    "${config.xdg.configHome}/niri" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/niri";
      recursive = true;
    };
    "${config.xdg.configHome}/waybar" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/waybar";
      recursive = true;
    };
    "${config.xdg.configHome}/swaylock" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/swaylock";
      recursive = true;
    };
    "${config.xdg.configHome}/mako" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/mako";
      recursive = true;
    };
    "${config.xdg.configHome}/fuzzel" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/fuzzel";
      recursive = true;
    };
  };
}
