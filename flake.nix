{
  description = "¯\_(ツ)_/¯";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    flake-utils.url = "github:numtide/flake-utils";

    home-manager = {
      url = "github:nix-community/home-manager";
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

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
      inputs.astal.follows = "astal";
    };
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-utils,
      home-manager,
      treefmt-nix,
      systems,
      ags,
      astal,
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
          formatter = treefmtEval.${pkgs.system}.config.build.wrapper;
          # for `nix flake check`
          checks = {
            formatting = treefmtEval.${pkgs.system}.config.build.check self;
          };

          devShells = import ./nix/shells {
            inherit
              pkgs
              system
              ags
              ;
          };

          packages = import ./nix/pkgs {
            inherit
              pkgs
              system
              ags
              astal
              ;
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
                specialArgs = { inherit inputs; };
                modules = [
                  ./nix/configuration.nix

                  nur.modules.nixos.default

                  home-manager.nixosModules.home-manager
                  {
                    home-manager.users.pmoieni = ./nix/home-manager/home.nix;
                    home-manager.extraSpecialArgs = { inherit hostname; };
                  }
                ];
              };
          in
          systems |> map (attrs: attrsets.nameValuePair attrs.hostname (mkHost attrs)) |> listToAttrs;
      }
    ];
}
