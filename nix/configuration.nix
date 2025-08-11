{
  inputs,
  lib,
  pkgs,
  ...
}:
{
  imports = [
    ./hardware-configuration.nix
  ];

  nix = {
    settings = {
      experimental-features = "nix-command flakes";
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

  home-manager = {
    useGlobalPkgs = true;
    useUserPackages = true;
    backupFileExtension = "backup";
  };

  # boot
  boot = {
    kernelParams = [
      "mem_sleep_default=deep"
    ];
    loader.systemd-boot.enable = true;
    loader.efi = {
      canTouchEfiVariables = true;
      efiSysMountPoint = "/boot";
    };
    supportedFilesystems = [ "ntfs" ];
  };

  # hardware
  hardware = {
    bluetooth = {
      enable = true;
      powerOnBoot = false;
    };
    cpu.intel.updateMicrocode = true;
    graphics = {
      enable = true;
      extraPackages = with pkgs; [
        vaapiIntel
        intel-media-driver
        vpl-gpu-rt
      ];
    };
    nvidia = {
      modesetting.enable = true;
      powerManagement.enable = true;
      powerManagement.finegrained = true;
      open = false;
      nvidiaSettings = true;
      prime = {
        offload = {
          enable = true;
          enableOffloadCmd = true;
        };
        intelBusId = "PCI:0:2:0";
        nvidiaBusId = "PCI:1:0:0";
      };
    };
  };

  # nnetworking
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
  services.printing.enable = true;

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

  services.desktopManager.gnome.enable = true;
  services.gvfs.enable = true;
  services.udisks2.enable = true;

  services.fwupd.enable = true;
  services.blueman.enable = true;

  services.desktopManager.cosmic = {
    enable = true;
    xwayland.enable = true;
  };

  services.displayManager.gdm.enable = true;

  services.thermald.enable = true;
  services.power-profiles-daemon.enable = false;
  # tlp and auto-cpufreq shouldn't be enabled simultaneously
  services.tlp = {
    enable = true;
    settings = {
      START_CHARGE_THRESH_BAT0 = 0;
      STOP_CHARGE_THRESH_BAT0 = 80;
      START_CHARGE_THRESH_BAT1 = 0;
      STOP_CHARGE_THRESH_BAT1 = 80;
    };
  };
  services.auto-cpufreq = {
    enable = false;
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
    ];
    packages = with pkgs; [
      waybar
      xwayland-satellite
      swayidle
      swaybg
      variety
      alacritty
      fuzzel
      swaylock
      mako
      pavucontrol
      brightnessctl
      libnotify
      google-chrome
      wl-clipboard
      wl-clip-persist
      wl-color-picker
      discord
      mpv
      ffmpeg-full
      telegram-desktop
    ];
  };

  environment.systemPackages = with pkgs; [
    vim
    wget
    tree
    btop
    curl
    zip
    unzip
    coreutils-full
    pciutils
    nettools
    fd
    jq
    fzf
    git
    lshw
    gnomeExtensions.appindicator
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
  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  programs.mtr.enable = true;
  programs.gnupg.agent = {
    enable = true;
    enableSSHSupport = true;
  };

  qt = {
    enable = true;
    platformTheme = "gnome";
    style = "adwaita-dark";
  };

  system.stateVersion = "25.05";
}
