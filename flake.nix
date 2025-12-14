{
  description = "¯\_(ツ)_/¯";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";

    home-manager = {
      url = "github:nix-community/home-manager/release-25.11";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nur = {
      url = "github:nix-community/NUR";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    systems.url = "github:nix-systems/default";

    stylix = {
      url = "github:nix-community/stylix/release-25.11";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    quickshell = {
      url = "github:outfoxxed/quickshell";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    noctalia = {
      url = "github:noctalia-dev/noctalia-shell";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      nixpkgs-unstable,
      flake-utils,
      home-manager,
      treefmt-nix,
      systems,
      stylix,
      nur,
      ...
    }:
    let
      inherit (builtins) foldl' listToAttrs;
      inherit (nixpkgs) lib;
      inherit (lib) attrsets;
      inherit (flake-utils.lib) eachDefaultSystem;

      foldAttrs = { } |> foldl' attrsets.recursiveUpdate;
    in
    foldAttrs [
      (eachDefaultSystem (
        system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };

          treefmtEval = treefmt-nix.lib.evalModule pkgs ./treefmt.nix;
        in
        {
          # for `nix fmt`
          formatter = treefmtEval.${pkgs.stdenv.hostPlatform.system}.config.build.wrapper;
          # for `nix flake check`
          checks = {
            formatting = treefmtEval.${pkgs.stdenv.hostPlatform.system}.config.build.check self;
          };
        }
      ))
      {
        nixosConfigurations =
          let
            systems = with flake-utils.lib.system; [
              {
                hostname = "asus";
                system = x86_64-linux;
              }
            ];

            mkHost =
              {
                hostname,
                system,
              }:
              nixpkgs.lib.nixosSystem {
                inherit system;
                specialArgs = { inherit inputs nixpkgs-unstable; };
                modules = [
                  ./nix/configuration.nix
                  nur.modules.nixos.default
                  home-manager.nixosModules.home-manager
                  {
                    home-manager.users.pmoieni = ./nix/home-manager/home.nix;
                    home-manager.extraSpecialArgs = { inherit hostname nixpkgs-unstable; };
                  }
                  stylix.nixosModules.stylix
                ];
              };
          in
          systems |> map (attrs: attrsets.nameValuePair attrs.hostname (mkHost attrs)) |> listToAttrs;
      }
    ];
}
