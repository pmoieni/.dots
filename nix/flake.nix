{
  description = "¯\_(ツ)_/¯";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    niri = {
      url = "github:sodiboo/niri-flake";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ {
    self,
    nixpkgs,
    home-manager,
    ...
  }: let
    inherit (self) outputs;
    system = "x86_64-linux";

    make-hm-packages = ps: attrs:
      import ps ({
          inherit system;
          config = {
            allowUnfree = true;
          };
        }
        // attrs);

    hm-pkgs = make-hm-packages nixpkgs {};

    mkHost = {
      hostname,
      username,
    }:
      home-manager.lib.homeManagerConfiguration {
        pkgs = hm-pkgs;
        modules = [
          ./home-manager/home.nix
          ./home-manager/hosts/${hostname}/home.nix
        ];
        extraSpecialArgs = {
          inherit hostname username;
        };
      };
  in {
    nixosConfigurations.nixos = nixpkgs.lib.nixosSystem {
      inherit system;
      specialArgs = {inherit inputs outputs;};
      modules = [./nix/configuration.nix];
    };

    homeConfigurations = {
      asus = mkHost {
        hostname = "asus";
        username = "pmoieni";
      };
    };
  };
}
