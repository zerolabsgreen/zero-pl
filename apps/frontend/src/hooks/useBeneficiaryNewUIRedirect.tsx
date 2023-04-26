import { useParams } from "react-router"
import { miners_new_ui_arr } from "../__mock__/miners_newui_map"

export const useBeneficiaryNewUIRedirect = () => {
  const { minerId } = useParams()

  const new_ui_url = miners_new_ui_arr.find(item => item.filecoinNodeId === minerId)?.url

  if (new_ui_url) {
    window.location.href = new_ui_url
    return true
  }

  return false
}
