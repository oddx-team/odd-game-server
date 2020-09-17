import mongoDB from 'mongodb'

async function useMongoDB (uri: string, dbName: string): Promise<void> {
  const mongoClient = await mongoDB.MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  global.mongoDB = mongoClient.db(dbName)
}

export default useMongoDB
