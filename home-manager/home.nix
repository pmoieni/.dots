{
  config,
  pkgs,
  hostname,
  username,
  ...
}: {
  imports = [./hosts/${hostname}/home.nix];

  home.username = "${username}";
  home.homeDirectory = "/home/${username}";

  home.stateVersion = "25.05";

  fonts.fontconfig.enable = true;

  home.packages = with pkgs; [
    fish
    neovim
    fastfetch
    gh
    subversion
    niv
    alejandra
    nodePackages.eslint_d
    nodePackages.prettier
    prettierd
    go
    golangci-lint
    rustup
    nodejs
    corepack
    clang_17
    clang-tools_17
    devenv
    lua-language-server
    gopls
    nil
    nodePackages.svelte-language-server
    nodePackages.typescript-language-server
    nodePackages.bash-language-server
    vscode-langservers-extracted
    tailwindcss-language-server
    cloudflare-warp

    nerd-fonts.fira-code
    nerd-fonts.blex-mono
    nerd-fonts.recursive-mono
  ];

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
  };

  home.sessionVariables = {
    EDITOR = "nvim";
  };

  programs = {
    home-manager.enable = true;
    git = {
      enable = true;
      lfs.enable = true;
      userName = "pmoieni";
      userEmail = "62774242+pmoieni@users.noreply.github.com";
    };
    direnv = {
      enable = true;
      nix-direnv.enable = true;
    };
  };
}
