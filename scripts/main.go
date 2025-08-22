package main

import (
	"github.com/pmoieni/.dots/scripts/internal/vpn"
)

func main() {
	/*
		var mode string

		cmd := &cli.Command{
			Name:  "scripts",
			Usage: "personalized scripts for my dotfiles",
			Flags: []cli.Flag{
				&cli.StringFlag{
					Name:        "mode",
					Aliases:     []string{"m"},
					Value:       "warp",
					Usage:       "warp, warp-in-warp, psiphon-in-warp, outline",
					Destination: &mode,
				},
			},
			Action: func(context.Context, *cli.Command) error {
				switch mode {
				case "warp":
				case "warp-in-warp":
				case "psiphon-in-warp":
				case "outline":
				default:
				}
				return nil
			},
		}

		if err := cmd.Run(context.Background(), os.Args); err != nil {
			log.Fatal(err)
		}
	*/

	v := vpn.New()
	v.Run()
}
