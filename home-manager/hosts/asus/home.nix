{pkgs, ...}: {
  home.packages = with pkgs; [
    speedtest-cli
    proxychains-ng
  ];
}
