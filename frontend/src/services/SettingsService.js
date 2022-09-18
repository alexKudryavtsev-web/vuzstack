import axios from "axios"
import { API_URL } from "../http"

class SettingsService {
    static async readSettings() {
        return axios.get(`${API_URL}/settings`)
    }
}

export default SettingsService