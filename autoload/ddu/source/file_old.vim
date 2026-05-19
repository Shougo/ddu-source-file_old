function! ddu#source#file_old#_get_oldfiles() abort
  " Build result manually to avoid creating intermediate lists and to
  " expand '~' and relative paths only once per entry using fnamemodify(':p').
  let l:res = []
  for l:val in v:oldfiles
    let l:path = fnamemodify(l:val, ':p')
    if filereadable(l:path) && fnamemodify(l:path, ':t') !=# 'COMMIT_EDITMSG'
      call add(l:res, l:path)
    endif
  endfor
  return l:res
endfunction
