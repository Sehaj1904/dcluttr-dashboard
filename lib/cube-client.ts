import cubejs from "@cubejs-client/core"

// config
const CUBEJS_API_URL =
  "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task/cubejs-api/v1"
const CUBEJS_API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicmFuZElkIjoiNDkiLCJleHAiOjE3NDM0OTYyMTIsImlzcyI6ImN1YmVjbG91ZCJ9.luqfkt0CQW_B01j5oAvl_8hicbFzPmyLXfvEZYJbej4"

const cubeApi = cubejs({
  apiUrl: CUBEJS_API_URL,
  headers: {
    Authorization: `Bearer ${CUBEJS_API_TOKEN}`,
  },
})

export default cubeApi

