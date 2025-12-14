require("pmoieni.core")
require("pmoieni.lazy")

if vim.fn.executable('rg') == 1 then
  vim.opt.grepprg = 'rg --hidden --smart-case --vimgrep'
end
