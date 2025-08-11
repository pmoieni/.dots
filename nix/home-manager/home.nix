{
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
    tokei
    neovim
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

    nerd-fonts.fira-code
    nerd-fonts.blex-mono
    nerd-fonts.recursive-mono
  ];

  home.sessionVariables = {
    EDITOR = "nvim";
    VISUAL = "nvim";
    MANPAGER = "nvim +Man!";
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
