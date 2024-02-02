// import { NextApiRequest, NextApiResponse } from 'next'
// import axios from 'axios'

// const ACCESS_TOKEN = process.env.KODIC_ACCESS_TOKEN

// export default async function animeById(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query

//   const config = {
//     params: {
//       token: ACCESS_TOKEN,
//       id: id as string,
//     },
//   }

//   try {
//     const response = await axios.get('https://kodikapi.com/search', config)
//     const data = response.data
//     res.status(200).json(data)
//   } catch (error: any) {
//     res.status(error.response?.status || 500).json({ error: error.message })
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next'
// import axios from 'axios'

// const ACCESS_TOKEN = process.env.KODIC_ACCESS_TOKEN

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // const { title } = req.query;

//   const config = {
//     params: {
//       token: ACCESS_TOKEN,
//       sort: 'updated_at',
//       order: 'desc',
//       limit: 30,
//       anime_status: 'ongoing',
//       with_material_data: true,
//       has_field: 'shikimori_id',
//     },
//   }

//   try {
//     const response = await axios.get('https://kodikapi.com/list', config)
//     const data = response.data
//     res.status(200).json(data)
//   } catch (error: any) {
//     res.status(error.response?.status || 500).json({ error: error.message })
//   }
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { name } = req.query

//   const config = {
//     params: {
//       token: ACCESS_TOKEN,
//       title: name as string,
//       strict: true,
//       with_material_data: true,
//       has_field: 'shikimori_id',
//     },
//   }

//   try {
//     const { data } = await axios.get('https://kodikapi.com/search', config)
//     // const data = response.data;
//     res.status(200).json(data)
//   } catch (error: any) {
//     res.status(error.response?.status || 500).json({ error: error.message })
//   }
// }