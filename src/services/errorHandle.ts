import { AxiosError } from 'axios'

const errorHandle = (err: AxiosError) => {
  console.error(err)
}

export default errorHandle
