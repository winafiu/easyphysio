const express = require('express')
const app = express()
const PORT = process.env.PORT || 3100

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
