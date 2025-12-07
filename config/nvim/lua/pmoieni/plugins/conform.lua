return {
    "stevearc/conform.nvim",
    event = { "BufWritePre" },
    cmd = { "ConformInfo" },
    config = function()
        local conform = require("conform")

        conform.setup({
            formatters_by_ft = vim.tbl_map(function(formatters)
                table.insert(formatters, 1, "treefmt")
                return formatters
            end, {
                c = { "clang-format" },
                cpp = { "clang-format" },
                json = { "jq" },
                lua = { "stylua" },
                nix = { "nixfmt" },
                rust = { "rustfmt" },
                sh = { "shfmt" },
                toml = { "taplo" },
                javascript = { "prettierd", "prettier", stop_after_first = true },
                javascriptreact = { "prettierd", "prettier", stop_after_first = true },
                typescript = { "prettierd", "prettier" },
                typescriptreact = { "prettierd", "prettier", stop_after_first = true },
                svelte = { "prettierd", "prettier", stop_after_first = true },
                css = { "prettierd", "prettier", stop_after_first = true },
                html = { "prettierd", "prettier", stop_after_first = true },
                yaml = { "prettierd", "prettier", stop_after_first = true },
                markdown = { "prettierd", "prettier", stop_after_first = true },
            }),
            format_on_save = {
                lsp_format = "fallback",
                stop_after_first = true,
            },
            default_format_opts = {
                timeout_ms = 2500,
                stop_after_first = true,
            },
            notify_on_error = true,
        })

        vim.api.nvim_create_user_command("Format", function(args)
            local range = nil
            if args.count ~= -1 then
                local end_line = vim.api.nvim_buf_get_lines(0, args.line2 - 1, args.line2, true)[1]
                range = {
                    start = { args.line1, 0 },
                    ["end"] = { args.line2, end_line:len() },
                }
            end
            conform.format({ async = true, lsp_fallback = true, range = range })
        end, { range = true })
    end,
    init = function()
        vim.o.formatexpr = "v:lua.require'conform'.formatexpr()"
    end,
}
