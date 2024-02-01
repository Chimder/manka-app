import AsideBar from '@/components/aside-bar'

export default function ChapterLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* <AsideBarChapter /> */}
      {children}
    </>
  )
}
