{
  description = "¯\_(ツ)_/¯";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
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
      home-manager,
      treefmt-nix,
      systems,
      ags,
      astal,
      ...
    }:
    let
      inherit (self) outputs;
      system = "x86_64-linux";

      mkHost =
        {
          hostname,
          username,
        }:
        nixpkgs.lib.nixosSystem {
          inherit system;
          specialArgs = { inherit inputs outputs; };
          modules = [
            ./nix/configuration.nix

            home-manager.nixosModules.home-manager
            {
              home-manager.users.${username} = ./nix/home-manager/home.nix;
              home-manager.extraSpecialArgs = { inherit username hostname; };
            }
          ];
        };

      pkgs = nixpkgs.legacyPackages.${system};

      eachSystem = f: nixpkgs.lib.genAttrs (import systems) (system: f nixpkgs.legacyPackages.${system});

      # Eval the treefmt modules from ./treefmt.nix
      treefmtEval = eachSystem (pkgs: treefmt-nix.lib.evalModule pkgs ./treefmt.nix);
    in
    {
      nixosConfigurations.asus = mkHost {
        hostname = "asus";
        username = "pmoieni";
      };

      # for `nix fmt`
      formatter = eachSystem (pkgs: treefmtEval.${pkgs.system}.config.build.wrapper);
      # for `nix flake check`
      checks = eachSystem (pkgs: {
        formatting = treefmtEval.${pkgs.system}.config.build.check self;
      });

      devShells.${system}.default = import ./nix/shells {
        inherit
          pkgs
          system
          ags
          ;
      };

      packages.${system}.default = pkgs.callPackage ./nix/pkgs {
        inherit ags astal;
      };
    };
}
