import { FilterFormPropsType, PersonalDataCardType } from ".."

type PanelPropsType={
    show:boolean
    hideFunc:()=>void   
}
export type PersonalDataPanelPropsType=PanelPropsType
export type FilterPanelPropsType=FilterFormPropsType&PanelPropsType
export type HorizontalPanelPropsType={
    uri:string
}&FilterFormPropsType&PanelPropsType