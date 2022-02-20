function! ddu#source#file_old#_get_oldfiles() abort
  return filter(map(copy(v:oldfiles),
        \ { _, val -> expand(val) }), { _, val -> filereadable(val) })
endfunction
