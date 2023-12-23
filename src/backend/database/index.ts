import { prismaWithPulse } from "prisma"

async function main() {
  const subscription = await prismaWithPulse.user.subscribe({})

  for await (const event of subscription) {
    console.log(“new event:”, event)
  }
}

main()