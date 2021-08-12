import * as array from './array'


async function testReadStupidArrays() {
  await array.readFromArrayByIndex()
  await array.readFromPublicArrayByIndex()

  // await array.readFromPublicArrayByIndexOutOfBoundFailure()
  await array.readFromFixedArrayByIndexNoInit()
}

async function testAddToStupidArrays() {
  // await array.addIndex0NoArrayInit() // FAILING ON BOTH WITH NO INIT
  await array.addIndex0WithExplicitArrayInit()

  await array.pushNoArrayInit()

  await array.add0PublicWithExplicitArrayInit()

  await array.pushPublicNoArrayInit()
}


export async function testStupidArrays() {
  try {
    await testAddToStupidArrays()
    await testReadStupidArrays()
  } catch (error) {
    console.log(error)
  }
}
