function! ddu#source#file_old#_get_oldfiles() abort
  if v:oldfiles->empty()
    return []
  endif

  let res = []
  for val in v:oldfiles
    " Expand leading '~' only (preserve relative paths like original)
    if val[0] ==# '~'
      let path = val->substitute('^\~', $HOME, '')
    else
      let path = val
    endif
    if path->filereadable() && path->fnamemodify(':t') !=# 'COMMIT_EDITMSG'
      call add(res, path)
    endif
  endfor
  return res
endfunction
