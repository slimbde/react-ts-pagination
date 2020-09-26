import React, { Fragment } from 'react'
import './styles.scss'


export enum dataTypes { "small", "large" }


type DataPickerType = {
  btnClick: (kind: dataTypes) => void
}


export const DataPicker: React.FC<DataPickerType> = (props: DataPickerType) => {
  return <Fragment>
    <div className="flex center-align">
      <small>Pick out necessary size:</small><br />
      <button className="btn blue waves-effect" onClick={props.btnClick.bind(null, dataTypes.small)}>Small Data</button>
      <button className="btn green waves-effect" onClick={props.btnClick.bind(null, dataTypes.large)}>Large Data</button>
    </div>
  </Fragment>
}