{
  pkgs,
  hostname,
  ...
}:
{
  imports = [ ./hosts/${hostname}/home.nix ];

  home.username = "pmoieni";
  home.homeDirectory = "/home/pmoieni";

  home.stateVersion = "25.05";

  home.packages = with pkgs; [
    fish
    tokei
    neovim
    gh
    subversion
    openssl
    niv
    taplo
    nodePackages.eslint_d
    nodePackages.prettier
    prettierd
    go
    golangci-lint
    rustup
    python3
    nodejs
    corepack
    # clang_17
    # clang-tools_17
    gcc
    lua-language-server
    gopls
    nil
    nodePackages.svelte-language-server
    nodePackages.typescript-language-server
    nodePackages.bash-language-server
    vscode-langservers-extracted
    tailwindcss-language-server
  ];

  home.sessionVariables = {
    EDITOR = "nvim";
    VISUAL = "nvim";
    MANPAGER = "nvim +Man!";
  };

  stylix = {
    enable = true;
    targets = {
      gtk.enable = true;
      qt.enable = true;
    };
    cursor = {
      name = "Bibata-Original-Classic";
      package = pkgs.bibata-cursors;
      size = 12;
    };
  };

  programs = {
    home-manager.enable = true;
    git = {
      enable = true;
      lfs.enable = true;
      settings = {
        user.name = "pmoieni";
        user.email = "62774242+pmoieni@users.noreply.github.com";
      };
    };
    direnv = {
      enable = true;
      nix-direnv.enable = true;
    };
  };
}
