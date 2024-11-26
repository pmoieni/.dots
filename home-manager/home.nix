{
  pkgs,
  inputs,
  ...
}: {
  imports = [
    inputs.ags.homeManagerModules.default
  ];

  fonts.fontconfig.enable = true;

  home = {
    username = "pmoieni";
    homeDirectory = "/home/pmoieni";
    packages = with pkgs; [
      # shell / terminal
      fish
      tmux
      neovim
      fastfetch

      # dev tools
      gh
      subversion
      niv
      alejandra
      nodePackages.eslint_d
      nodePackages.prettier
      prettierd
      go
      golangci-lint
      erlang
      elixir
      # jdk21
      rustup
      nodejs
      corepack
      # bun
      esbuild # required for AGS
      clang_17
      clang-tools_17
      # podman-compose
      devenv

      # LSP
      lua-language-server
      gopls
      elixir-ls
      # jdt-language-server
      nil
      nodePackages.svelte-language-server
      nodePackages.typescript-language-server
      nodePackages.bash-language-server
      vscode-langservers-extracted
      tailwindcss-language-server

      # Fonts
      (pkgs.nerdfonts.override {fonts = ["FiraCode" "IBMPlexMono" "Ubuntu"];})

      # Utilities
      speedtest-cli
      libnotify
      pavucontrol
      brightnessctl
      playerctl
      cliphist
      tokei
      yt-dlp
      ripgrep
      hyperfine
      ncdu
      alsa-utils
      pamixer
      imagemagick
      ffmpeg-full
      grim
      slurp
      wf-recorder
      swappy
      swww
      dart-sass
      libsForQt5.qt5ct
      qt6ct
      fd
      gnome.gvfs
      ranger
      cloudflare-warp

      # Extra
      matugen
      adwaita-icon-theme
      adw-gtk3
      bibata-cursors
    ];
  };

  programs = {
    home-manager.enable = true;
    git = {
      enable = true;
      lfs.enable = true;
      userName = "Parham Moieni";
      userEmail = "62774242+pmoieni@users.noreply.github.com";
    };
    ags = {
      enable = true;
      extraPackages = [
        inputs.ags.packages.${pkgs.system}.apps
        inputs.ags.packages.${pkgs.system}.battery
        inputs.ags.packages.${pkgs.system}.hyprland
        inputs.ags.packages.${pkgs.system}.wireplumber
        inputs.ags.packages.${pkgs.system}.network
        inputs.ags.packages.${pkgs.system}.tray
        inputs.ags.packages.${pkgs.system}.battery
        inputs.ags.packages.${pkgs.system}.notifd
        inputs.ags.packages.${pkgs.system}.mpris
        inputs.ags.packages.${pkgs.system}.bluetooth
      ];
    };
    direnv = {
      enable = true;
      nix-direnv.enable = true;
    };
  };

  systemd.user.startServices = "sd-switch";

  # https://nixos.wiki/wiki/FAQ/When_do_I_update_stateVersion
  home.stateVersion = "23.11";
}
