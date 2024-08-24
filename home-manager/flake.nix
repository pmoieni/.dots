{
  description = "Home Manager configuration of pmoieni";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    # nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    ags.url = "github:Aylur/ags";
  };

  outputs = {
    self,
    nixpkgs,
    # nixpkgs-unstable,
    home-manager,
    ...
  } @ inputs: let
    inherit (self) outputs;
    system = "x86_64-linux";

    make-hm-packages = ps: attrs:
      import ps ({
          inherit system;
          config = {
            allowUnfree = true;
            # Workaround for https://github.com/nix-community/home-manager/issues/2942
            allowUnfreePredicate = _: true;
          };
        }
        // attrs);

    hm-pkgs = make-hm-packages nixpkgs {};
    # hm-pkgs-unstable = make-hm-packages nixpkgs-unstable {};
  in {
    homeConfigurations."pmoieni" = home-manager.lib.homeManagerConfiguration {
      pkgs = hm-pkgs;
      extraSpecialArgs = {
        inherit inputs outputs;
      };
      modules = [./home.nix];
    };
  };
}
