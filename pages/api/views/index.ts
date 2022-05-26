import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from 'lib/prisma'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const total = await prisma.views
      .aggregate({
        _sum: {
          count: true,
        },
      })
      .then((totalViews) => totalViews._sum.count ?? BigInt(0))

    return res.status(200).json({total: total.toString()})
  } catch (e: any) {
    return res.status(500).json({message: e.message})
  }
}
