{
  inputs,
  lib,
  pkgs,
  ...
}:
let
  chargeUpto = pkgs.writeScriptBin "charge-upto" ''
    #!${pkgs.bash}/bin/bash
    echo ''${1:-100} > /sys/class/power_supply/BAT?/charge_control_end_threshold
  '';
in
{
  imports = [
    ./hardware-configuration.nix
  ];

  nix = {
    settings = {
      experimental-features = "nix-command flakes pipe-operators";
      auto-optimise-store = true;
    };
    registry = (lib.mapAttrs (_: flake: { inherit flake; })) (
      (lib.filterAttrs (_: lib.isType "flake")) inputs
    );
    nixPath = [ "/etc/nix/path" ];
    gc = {
      automatic = true;
      dates = "weekly";
      options = "--delete-older-than 7d";
    };
  };

  nixpkgs = {
    config.allowUnfree = true;
  };

  stylix = {
    enable = true;
    polarity = "dark";
    autoEnable = false;
    base16Scheme = {
      base00 = "191724";
      base01 = "1f1d2e";
      base02 = "26233a";
      base03 = "6e6a86";
      base04 = "908caa";
      base05 = "e0def4";
      base06 = "e0def4";
      base07 = "524f67";
      base08 = "eb6f92";
      base09 = "f6c177";
      base0A = "ebbcba";
      base0B = "31748f";
      base0C = "9ccfd8";
      base0D = "c4a7e7";
      base0E = "f6c177";
      base0F = "524f67";
    };
  };

  home-manager = {
    useGlobalPkgs = true;
    useUserPackages = true;
    backupFileExtension = "backup";
  };

  # networking
  networking.hostName = "nixos";
  networking.wireless.iwd = {
    enable = false;
    settings = {
      Settings = {
        AutoConnect = true;
      };
    };
  };
  networking.networkmanager = {
    enable = true;
    # wifi.backend = "iwd";
  };

  # time
  time.timeZone = "Asia/Tehran";
  time.hardwareClockInLocalTime = true;

  # locale
  i18n.defaultLocale = "en_US.UTF-8";

  # services
  services.fstrim.enable = true;

  services.upower.enable = true;

  services.printing = {
    enable = true;
    drivers = [ pkgs.hplipWithPlugin ];
  };

  services.pipewire = {
    enable = true;
    pulse.enable = true;
    alsa = {
      enable = true;
      support32Bit = true;
    };
    jack.enable = true;
  };

  services.xserver = {
    enable = true;
    xkb.layout = "us,ir";
    xkb.variant = "";
    xkb.options = "grp:win_space_toggle,caps:swapescape";
    videoDrivers = [
      "modesetting"
      "nvidia"
    ];
  };

  services.fwupd.enable = true;
  services.blueman.enable = true;

  services.displayManager.ly.enable = true;

  services.thermald.enable = true;
  services.power-profiles-daemon.enable = false;
  # tlp and auto-cpufreq shouldn't be enabled simultaneously
  services.tlp = {
    enable = false;
    settings = {
      START_CHARGE_THRESH_BAT0 = 0;
      STOP_CHARGE_THRESH_BAT0 = 80;
      START_CHARGE_THRESH_BAT1 = 0;
      STOP_CHARGE_THRESH_BAT1 = 80;
    };
  };
  services.auto-cpufreq = {
    enable = true;
    settings = {
      battery = {
        governor = "powersave";
        turbo = "never";
      };
      charger = {
        governor = "performance";
        turbo = "auto";
      };
    };
  };

  services.cloudflare-warp.enable = true;

  systemd = {
    # services.battery-charge-threshold = {
    # wantedBy = [
    #"local-fs.target"
    #"suspend.target"
    #];
    #after = [
    #"local-fs.target"
    #"suspend.target"
    #];
    #description = "Set the battery charge threshold to the given percentage";
    #startLimitBurst = 5;
    #startLimitIntervalSec = 1;
    # serviceConfig = {
    #Type = "oneshot";
    #Restart = "on-failure";
    #ExecStart = "${pkgs.runtimeShell} -c 'echo ${toString 80} > /sys/class/power_supply/BAT?/charge_control_end_threshold'";
    #};
    #};
    user.services.polkit-gnome-authentication-agent-1 = {
      description = "polkit-gnome-authentication-agent-1";
      wantedBy = [ "graphical-session.target" ];
      wants = [ "graphical-session.target" ];
      after = [ "graphical-session.target" ];
      serviceConfig = {
        Type = "simple";
        ExecStart = "${pkgs.polkit_gnome}/libexec/polkit-gnome-authentication-agent-1";
        Restart = "on-failure";
        RestartSec = 1;
        TimeoutStopSec = 10;
      };
    };
    user.services = {
      cliphist-text = {
        description = "wl-paste + cliphist service for text";
        serviceConfig = {
          Type = "simple";
          ExecStart = "${pkgs.wl-clipboard}/bin/wl-paste --type text --watch ${pkgs.cliphist}/bin/cliphist store";
          Restart = "on-failure";
        };
      };
      cliphist-image = {
        description = "wl-paste + cliphist service for text";
        serviceConfig = {
          Type = "simple";
          ExecStart = "${pkgs.wl-clipboard}/bin/wl-paste --type image --watch ${pkgs.cliphist}/bin/cliphist store";
          Restart = "on-failure";
        };
      };
    };
  };

  # env
  environment.variables = {
    MOZ_ENABLE_WAYLAND = "1";
    NIXOS_OZONE_WL = "1";
    GSK_RENDERER = "ngl";
    GDK_BACKEND = "wayland";
    XDG_SESSION_TYPE = "wayland";
  };

  security = {
    rtkit.enable = true;
    polkit.enable = true;
    pam = {
      loginLimits = [
        {
          domain = "@users";
          item = "rtprio";
          type = "-";
          value = 1;
        }
      ];
      services.swaylock = { };
    };
  };

  xdg.portal = {
    enable = true;
    wlr.enable = true;
    extraPortals = with pkgs; [
      xdg-desktop-portal-gtk
    ];
  };

  users.users.pmoieni = {
    isNormalUser = true;
    extraGroups = [
      "wheel"
      "networkmanager"
      "video"
      "audio"
      "lp"
      "scanner"
      "wireshark"
      "podman"
    ];
    packages = with pkgs; [
      alacritty
      obsidian
      audacity
      telegram-desktop
      blender
      brave
      obs-studio
      zed-editor
      shotwell
      anydesk
      vesktop
      evince
      podman-compose
      neovim
      fish
      tokei
      gh
      ripgrep
    ];
  };

  environment.systemPackages = with pkgs; [
    # battery charge limit script
    # chargeUpto
    man-pages
    man-pages-posix 
    wev
    file-roller
    kdePackages.dolphin
    gparted
    ffmpeg-full
    mpv
    wl-clipboard
    wl-clip-persist
    wl-color-picker
    pavucontrol
    xwayland-satellite
    btop
    playerctl
    vim
    wget
    tree
    htop
    curlFull
    zip
    unzip
    coreutils-full
    pciutils
    nettools
    fd
    jq
    fzf
    git
    subversion
    openssl
    lshw
    psmisc
    wirelesstools
    nur.repos.ataraxiasjel.waydroid-script
    inputs.noctalia.packages.${stdenv.hostPlatform.system}.default
  ];

  programs.xwayland.enable = true;
  programs.dconf.profiles.user.databases = [
    {
      settings = {
        "org/gnome/mutter" = {
          experimental-features = [
            "scale-monitor-framebuffer" # Enables fractional scaling (125% 150% 175%)
            "xwayland-native-scaling" # Scales Xwayland applications to look crisp on HiDPI screens
          ];
        };
        "org/gnome/desktop/interface".color-scheme = "prefer-dark";
      };
    }
  ];
  programs.firefox = {
    enable = true;
    preferences = {
      "privacy.resistFingerprinting" = true;
    };
    policies = {
      DisableTelemetry = true;
    };
  };
  programs.niri.enable = true;
  #programs.hyprland = {
  #enable = true;
  #withUWSM = true; # recommended for most users
  #xwayland.enable = true; # Xwayland can be disabled.
  #};
  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  programs.mtr.enable = true;
  programs.gnupg.agent = {
    enable = true;
    enableSSHSupport = true;
  };
  programs.appimage = {
    enable = true;
    binfmt = true;
  };
  programs.wireshark = {
    enable = true;
    package = pkgs.wireshark;
    dumpcap.enable = true;
    usbmon.enable = true;
  };
  programs.adb.enable = true;
  programs.localsend.enable = true;
  programs.steam = {
    enable = true;
    remotePlay.openFirewall = true; # Open ports in the firewall for Steam Remote Play
    dedicatedServer.openFirewall = true; # Open ports in the firewall for Source Dedicated Server
  };

  virtualisation = {
    containers.enable = true;
    podman = {
      enable = true;
      # Create a `docker` alias for podman, to use it as a drop-in replacement
      dockerCompat = true;
      # Required for containers under podman-compose to be able to talk to each other.
      defaultNetwork.settings.dns_enabled = true;
    };
    waydroid.enable = true;
  };

  qt = {
    enable = true;
    # platformTheme = "gnome";
    # style = "adwaita-dark";
  };

  fonts = {
    enableDefaultPackages = true;
    packages = with pkgs; [
      nerd-fonts.fira-code
      nerd-fonts.blex-mono
      nerd-fonts.recursive-mono
      nerd-fonts.caskaydia-cove
      material-symbols
    ];
  };

  system.stateVersion = "25.05";
}
