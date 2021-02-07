import siteMetadata from '@/data/siteMetadata'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'
import {TopTracks} from '@/components/top-tracks'
import {TopArtists} from '@/components/top-artists'

export default function Dashboard() {
  return (
    <>
      <PageSeo
        title={`Dashboard - ${siteMetadata.author}`}
        description={`Dashboard - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/dashboard`}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Dashboard</PageTitle>
      </div>
      <TopTracks />
      <TopArtists />
    </>
  )
}
