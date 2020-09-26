import React, { useEffect, useRef } from 'react'
import M from 'materialize-css'
import { orderType, User } from '../interfaces'
import ArrowDown from "@material-ui/icons/ArrowDropDown"
import ArrowUp from "@material-ui/icons/ArrowDropUp"
import './styles.scss'



type tableProps = {
  users: User[],
  onHeaderClick: (header: string) => void,
  orderType: orderType,
  orderColumn: string
}


export const Table: React.FC<tableProps> = (props: tableProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const fillModal = (u: User) => {
    ref.current!.innerHTML =
      `<h4>${u.firstName} ${u.lastName}</h4><hr />
        <div style="display:flex;justify-content:space-between">
          <small>${u.email}</small><small>${u.phone}</small>
        </div>
        <p>${u.description}</p>
        <p>
          <b>ADDRESS:</b><br/>
          <small>State: </small>${u.address.state}<br/>
          <small>City: </small>${u.address.city}<br/>
          <small>ZIP: </small>${u.address.zip}<br/>
          <small>Street address: </small>${u.address.streetAddress}
        </p>`
  }

  useEffect(() => {
    const modalEl = M.Modal.init(document.querySelector(".modal") as HTMLElement)
    return () => modalEl.destroy()
  }, [])

  const body = props.users.map((u: User) =>
    <tr key={u.id + u.phone} data-target="modal1" className="modal-trigger" onClick={() => fillModal(u)}>
      <td>{u.id}</td>
      <td>{u.firstName}</td>
      <td>{u.lastName}</td>
      <td>{u.email}</td>
      <td>{u.phone}</td>
    </tr>)

  const arrow = props.orderType === "asc" ? <ArrowUp /> : <ArrowDown />
  const pHolder = <ArrowUp className="white" />


  return (
    <div className="row">
      <small>Users table:</small>
      <table className="highlight">
        <thead>
          <tr>
            <th onClick={() => props.onHeaderClick("id")}>Id{props.orderColumn === "id" ? arrow : pHolder}</th>
            <th onClick={() => props.onHeaderClick("firstName")}>First Name{props.orderColumn === "firstName" ? arrow : pHolder}</th>
            <th onClick={() => props.onHeaderClick("lastName")}>Last Name{props.orderColumn === "lastName" ? arrow : pHolder}</th>
            <th onClick={() => props.onHeaderClick("email")}>Email{props.orderColumn === "email" ? arrow : pHolder}</th>
            <th onClick={() => props.onHeaderClick("phone")}>Phone{props.orderColumn === "phone" ? arrow : pHolder}</th>
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>


      <div id="modal1" className="modal">
        <div className="modal-content" ref={ref}></div>
      </div>
    </div>
  )
}