// import React from 'react'
// import { GetServerSidePropsContext } from 'next'
// import { cn } from '@/shared/lib/utils'
// import axios from 'axios'

// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import AnimeRecomend from '@/components/a-recomend'
// import AnimeRating from '@/components/anime-rating'
// import DotPublication from '@/components/dot-publication'

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const id = context?.params?.id as string
//   const config = {
//     params: {
//       token: process.env.KODIC_ACCESS_TOKEN,
//       id: id as string,
//       with_material_data: true,
//     },
//   }
//   const response = await axios.get('https://kodikapi.com/search', config)
//   const data = response.data.results[0]
//   return { props: { data } }
// }
// const Anime = ({ params }: { params: { id: string } }) => {
//   const anime = {}
//   return (
//     <main className="overflow-x-hidden ">
//       <section className="max-h-[480px] lg:-z-10 ">
//         <span className="absolute left-1/2 top-20 z-[-100]">
//           If you cant see the image, turn on VPN
//         </span>

//         <div
//           className="absolute left-0 top-[-80px] z-[-2] h-[640px] w-full"
//           style={{
//             background: `url(${anime.material_data.poster_url}) no-repeat top 50% center / 100%`,
//           }}
//         >
//           <div className="md:bg-gradient-light-anime dark:md:bg-gradient-dark absolute inset-x-0 bottom-0 z-20 h-full bg-background/30 md:backdrop-blur-none lg:z-40 lg:backdrop-blur-[1px]"></div>
//         </div>
//       </section>
//       <section className="z-100 flex h-full w-full pt-[36vh] md:pt-40 lg:pt-[30vh] ">
//         <div className="containerM flex w-full bg-background md:bg-transparent md:p-4">
//           <div className="z-90 -mt-28 w-1/5 md:backdrop-blur-none lg:mt-0 lg:backdrop-blur-md">
//             <img
//               className="md: z-100 w-full self-end rounded-lg lg:rounded-none"
//               src={anime?.material_data?.poster_url}
//               alt="If you can't see the image, turn on VPN"
//             />
//           </div>
//           <div className="z-100 w-4/5 md:backdrop-blur-none lg:backdrop-blur-md">
//             <div className="flex items-center justify-between ">
//               <h1 className="relative flex px-5 py-0 text-3xl  font-semibold drop-shadow-2xl md:px-2 md:text-xl md:text-white lg:text-2xl">
//                 {anime?.title_orig}
//               </h1>
//               <AnimeRating anime={anime.material_data} />
//             </div>
//             <div className="relative my-2.5 ml-5 flex w-full flex-wrap items-center md:ml-1 lg:ml-2">
//               <Button
//                 // onClick={addFavorite}
//                 className={cn(
//                   'bg-teal-600 px-14 text-white hover:bg-teal-600/60 sm:mr-3 sm:w-full md:py-0',
//                 )}
//               >
//                 Do nothing
//                 {/* {favorite ? "Favorite" : "Add To Favorite"} */}
//               </Button>
//               {anime?.material_data?.genres?.map((genres: any, i: number) => (
//                 <Badge
//                   className="lg:-py-0 bg-badge hover:bg-badge/70 ml-3 cursor-default text-white sm:mt-1 md:mt-2 lg:rounded-md lg:px-1"
//                   key={i}
//                 >
//                   {genres}
//                 </Badge>
//               ))}
//               <DotPublication year={anime?.year} status={anime?.material_data?.all_status} />
//             </div>
//             <div className="mx-5 text-lg md:hidden lg:text-sm xl:text-[16px]">
//               {anime?.material_data.description}
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="containerM mx-auto h-full w-full bg-background pb-40 pt-2.5 md:bg-transparent  lg:bg-background">
//         <div className="flex md:flex-col">
//           <aside className="w-1/5 flex-col md:flex md:w-full md:items-center md:pt-4">
//             <AnimeRecomend name={anime?.material_data?.title_en} />
//           </aside>
//           <div className="w-4/5 px-5 md:w-full md:px-0">
//             <span className="lg:text-md text-xl font-semibold md:px-4">Episode</span>
//             <div className="pt-3 md:px-4 md:pb-14">
//               <div className="aspect-w-16 aspect-h-9">
//                 <iframe src={anime.link} className="h-[60vh]  w-full" allowFullScreen></iframe>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }

// export default Anime
