function! ddu#source#file_old#_get_oldfiles() abort
  return v:oldfiles->copy()->map(
        \ { _, val -> val->substitute('^\~', '\=$HOME', '') })->filter(
        \ { _, val -> val->filereadable()
        \             && val->fnamemodify(':t') !=# 'COMMIT_EDITMSG' })
endfunction
