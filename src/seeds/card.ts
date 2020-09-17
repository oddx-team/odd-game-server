import useMongoDB from 'persistence/mongodb'
import cardsData from './cards_data.json'

async function main (): Promise<void> {
  try {
    const mongoDBUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/odd-game-db'
    await useMongoDB(mongoDBUri, 'default')
    const cardCollection = global.mongoDB.collection('cards')
    console.log('Drop cards database...')
    await cardCollection.drop()
    console.log('Populating data...')
    await cardCollection.insertMany(cardsData)
    console.log('Done!')
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

void main()
