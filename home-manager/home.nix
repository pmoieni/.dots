{ pkgs
, pkgs-unstable
, ...
}: {
  imports = [];

  home = {
    username = "pmoieni";
    homeDirectory = "/home/pmoieni";
    packages = (with pkgs; [
      # shell / terminal
      fish
      tmux
    ]) ++ (with pkgs-unstable; [
      # shell / terminal
      neovim
      fastfetch

      # dev tools
      gh
      niv
      nodePackages.eslint_d
      nodePackages.prettier
      prettierd
      go
      golangci-lint
      erlang
      elixir
      jdk21
      rustup
      nodejs
      yarn
      bun
      esbuild
      clang_17
      clang-tools_17

      # LSP
      lua-language-server
      gopls
      elixir-ls
      jdt-language-server
      nil
      nodePackages.svelte-language-server
      nodePackages.typescript-language-server
      nodePackages.bash-language-server
      vscode-langservers-extracted
      tailwindcss-language-server
    ]);
  };

  programs = {
    home-manager.enable = true;
    git = {
      enable = true;
      lfs.enable = true;
      userName = "Parham Moieni";
      userEmail = "62774242+pmoieni@users.noreply.github.com";
    };
  };

  systemd.user.startServices = "sd-switch";

  # https://nixos.wiki/wiki/FAQ/When_do_I_update_stateVersion
  home.stateVersion = "23.11";
}
