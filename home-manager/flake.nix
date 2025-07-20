{
  description = "¯\_(ツ)_/¯";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1";

    home-manager = {
      url = "https://flakehub.com/f/nix-community/home-manager/0.1";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    nixpkgs,
    home-manager,
    ...
  }: let
    system = "x86_64-linux";

    makePackages = ps: attrs:
      import ps ({
          inherit system;
          config = {
            allowUnfree = true;
            # Workaround for https://github.com/nix-community/home-manager/issues/2942
            allowUnfreePredicate = _: true;
          };
        }
        // attrs);

    hmPkgs = makePackages nixpkgs {};

    mkHost = {
      hostname,
      username,
    }:
      home-manager.lib.homeManagerConfiguration {
        pkgs = hmPkgs;
        modules = [
          ./home.nix
          ./hosts/${hostname}/home.nix
        ];
        extraSpecialArgs = {
          inherit hostname username;
        };
      };
  in {
    homeConfigurations = {
      asus = mkHost {
        hostname = "asus";
        username = "pmoieni";
      };
    };
  };
}
