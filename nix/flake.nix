{
  description = "¯\_(ツ)_/¯";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
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

    mkHost = {
      hostname,
      username,
    }:
      nixpkgs.lib.nixosSystem {
        inherit system;
        specialArgs = {inherit inputs outputs;};
        modules = [
          ./nix/configuration.nix

          home-manager.nixosModules.home-manager
          {
            home-manager.users.${username} = ./home-manager/home.nix;
            home-manager.extraSpecialArgs = {inherit username hostname;};
          }
        ];
      };
  in {
    nixosConfigurations.asus = mkHost {
      hostname = "asus";
      username = "pmoieni";
    };
  };
}
