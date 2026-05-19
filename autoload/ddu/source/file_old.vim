function! ddu#source#file_old#_get_oldfiles() abort
  " Build result manually to avoid creating intermediate lists and to
  " expand '~' and relative paths only once per entry using fnamemodify(':p').
  let res = []
  for val in v:oldfiles
    let path = fnamemodify(val, ':p')
    if filereadable(path) && fnamemodify(path, ':t') !=# 'COMMIT_EDITMSG'
      call add(res, path)
    endif
  endfor
  return res
endfunction
