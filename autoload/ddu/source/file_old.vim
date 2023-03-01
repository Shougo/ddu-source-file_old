function! ddu#source#file_old#_get_oldfiles() abort
  return filter(map(copy(v:oldfiles),
        \ { _, val -> substitute(val, '^\~', '\=$HOME', '') }),
        \ { _, val -> filereadable(val)
        \             && fnamemodify(val, ':t') !=# 'COMMIT_EDITMSG' })
endfunction
