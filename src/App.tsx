import React, { useState } from 'react';
import { Table } from './components/Table'
import { DataPicker, dataTypes } from './components/DataPicker'
import { Loader } from './components/Loader'
import { orderType, User } from './components/interfaces';
import { Filter } from './components/Filter'
import Paginate from 'react-paginate'
import Left from "@material-ui/icons/ChevronLeft"
import Right from "@material-ui/icons/ChevronRight"
import _ from 'lodash'
import 'materialize-css/dist/js/materialize.min.js'




export const App: React.FC = () => {

  const smallData = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

  const largeData = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'



  type appState = {
    loading: boolean,
    users: User[],
    chunks: Array<User[]>,
    orderColumn: string,
    orderType: orderType,
    currentChunk: User[],
    currentIndex: number
  }


  const chunkSize = 10


  const [state, setState] = useState<appState>({
    loading: false,
    users: [],
    chunks: [],
    orderColumn: "id",
    orderType: "asc",
    currentChunk: [],
    currentIndex: 0,
  })


  const btnClick = (kind: dataTypes) => {
    setState(prev => ({ ...prev, loading: true }))

    fetch(kind === dataTypes.small ? smallData : largeData)
      .then(resp => resp.json() as Promise<User[]>)
      .then(data => setState(prev => {
        const users = _.orderBy(data, state.orderColumn, state.orderType)
        const chunks = _.chunk(users, chunkSize)

        return {
          ...prev,
          loading: false,
          users: users,
          chunks: chunks,
          currentChunk: chunks[0],
          currentIndex: 0,
        }
      }))
  }


  const headerClick = (header: string) => {
    const newOrder = state.orderColumn !== header
      ? "asc"
      : state.orderType === "asc" ? "desc" : "asc"

    setState(prev => ({
      ...prev,
      currentChunk: _.orderBy(prev.currentChunk, header, newOrder),
      orderColumn: header,
      orderType: newOrder
    }))
  }


  const handlePageClick = (item: { selected: number }) => {
    setState(prev => ({
      ...prev,
      currentChunk: prev.chunks[item.selected],
      currentIndex: item.selected,
    }))
  }


  const handleInput = (input: string) => {
    const newUsers = input
      ? state.users.filter(u => u.firstName.includes(input) || u.lastName.includes(input) || u.email.includes(input))
      : state.users

    const inputClassList = document.querySelector(".validate")!.classList

    if (newUsers.length) {
      const newChunks = _.chunk(newUsers, chunkSize)

      !inputClassList.contains("valid") && inputClassList.add("valid")
      inputClassList.remove("invalid")

      setState(prev => ({
        ...prev,
        chunks: newChunks,
        currentChunk: newChunks[0],
        currentIndex: 0
      }))
    }
    else {
      inputClassList.remove("valid")
      !inputClassList.contains("invalid") && inputClassList.add("invalid")
    }

  }


  return (
    <div className="container">
      {state.loading && <Loader />}
      {state.users.length === 0 && !state.loading && <DataPicker btnClick={btnClick} />}
      {state.users.length > 0 && <>
        <Filter onInput={handleInput} />
        <Table
          users={state.currentChunk}
          onHeaderClick={headerClick}
          orderType={state.orderType}
          orderColumn={state.orderColumn}
        />
        <Paginate
          previousLabel={<Left />}
          nextLabel={<Right />}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={state.chunks.length}
          //pageClassName={'waves-effect'}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          forcePage={state.currentIndex}
        />
      </>}
    </div>
  );
}

export default App;
