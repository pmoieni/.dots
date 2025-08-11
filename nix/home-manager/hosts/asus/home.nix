{config, ...}: {
  # home.packages = with pkgs; [];

  home.file = {
    "${config.xdg.configHome}/alacritty" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/alacritty";
      recursive = true;
    };
    "${config.xdg.configHome}/nvim" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/nvim";
      recursive = true;
    };
    "${config.xdg.configHome}/nvim-dev" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/nvim-dev";
      recursive = true;
    };
    "${config.xdg.configHome}/wezterm" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/wezterm";
      recursive = true;
    };
    "${config.xdg.configHome}/zed" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/zed";
      recursive = true;
    };
    "${config.xdg.configHome}/fish" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/fish";
      recursive = true;
    };
    "${config.xdg.configHome}/niri" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/niri";
      recursive = true;
    };
    "${config.xdg.configHome}/waybar" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/waybar";
      recursive = true;
    };
    "${config.xdg.configHome}/swaylock" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/swaylock";
      recursive = true;
    };
    "${config.xdg.configHome}/mako" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/mako";
      recursive = true;
    };
    "${config.xdg.configHome}/fuzzel" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/.config/fuzzel";
      recursive = true;
    };
  };
}
