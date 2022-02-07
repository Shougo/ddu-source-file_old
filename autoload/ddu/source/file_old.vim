function! ddu#source#file_old#_get_oldfiles() abort
  return reverse(filter(map(copy(v:oldfiles),
        \ { _, val -> expand(val) }), { _, val ->
        \ filereadable(val) || buflisted(val) }),
        \ )
endfunction
