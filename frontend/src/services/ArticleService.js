import axios from "axios"
import { API_URL } from "../http"

class ArticleService {
    static async readArticle(id) {
        return axios.get(`${API_URL}/article/${id}`)
    }
}

export default ArticleService