function! ddu#source#file_old#_get_oldfiles() abort
  return reverse(filter(copy(v:oldfiles), { _, val ->
        \ filereadable(val) || buflisted(val) }))
endfunction
