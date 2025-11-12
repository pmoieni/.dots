{ config, ... }:
{
  # home.packages = with pkgs; [];

  home.file = {
    "${config.xdg.configHome}/alacritty" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/config/alacritty";
      recursive = true;
    };
    "${config.xdg.configHome}/nvim" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/config/nvim";
      recursive = true;
    };
    "${config.xdg.configHome}/nvim-dev" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/config/nvim-dev";
      recursive = true;
    };
    "${config.xdg.configHome}/zed" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/config/zed";
      recursive = true;
    };
    "${config.xdg.configHome}/fish" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/config/fish";
      recursive = true;
    };
    "${config.xdg.configHome}/niri" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/config/niri";
      recursive = true;
    };
    "${config.xdg.configHome}/noctalia" = {
      source = config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/.dots/config/noctalia";
      recursive = true;
    };
  };
}
