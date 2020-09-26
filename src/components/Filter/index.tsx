import React, { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { map, debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import M from 'materialize-css'



type FilterProps = {
  onInput: (input: string) => void
}



export const Filter: React.FC<FilterProps> = (props: FilterProps) => {
  const ref = useRef<HTMLInputElement>(null)


  useEffect(() => {
    const stream$ = fromEvent(ref.current!, "input")
      .pipe(
        map((e: any) => e.target!.value),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => ref.current!.innerHTML = ""),
      )

    stream$.subscribe((value: any) => {
      props.onInput(value)
    })

    M.updateTextFields()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="input-field">
    <input id="first_name" type="text" className="validate" ref={ref} />
    <label htmlFor="first_name">FILTER BY FIRST NAME, LAST NAME OR EMAIL</label>
  </div>
}