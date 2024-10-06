import { connect } from "mongoose"

async function main() {
    await connect('mongodb://localhost:27017/utn')
}

main()
.then(()=>console.log("DB connected on local environment"))
.catch(err => console.log(`DB connection failed ${err.message}`))