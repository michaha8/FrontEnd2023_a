import { create } from "apisauce";

const apiClient = create({
    baseURL: 'http://26.232.177.81:3000',
    headers: { Accept: 'application/vnd.github.v3+json' },
})

export default apiClient