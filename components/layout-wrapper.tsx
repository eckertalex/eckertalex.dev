import siteMetadata from '@/data/siteMetadata.json'
import {headerNavLinks} from '@/data/headerNavLinks'
import {CustomLink} from '@/components/link'
import {SectionContainer} from '@/components/section-container'
import {Footer} from '@/components/footer'
import {MobileNav} from '@/components/mobile-nav'
import {ThemeSwitch} from '@/components/theme-switch'

export function LayoutWrapper(props: React.PropsWithChildren<unknown>) {
  const {children} = props

  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <CustomLink aria-label="eckertalex.dev" className="hover:no-underline" href="/">
              <div className="flex items-center justify-between">
                <div className="h-6 text-4xl font-semibold text-pink-500">{siteMetadata.author}</div>
              </div>
            </CustomLink>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden md:block">
              {headerNavLinks.map((link) => (
                <CustomLink
                  className="p-1 font-medium text-gray-700 sm:p-4 dark:text-gray-400"
                  href={link.href}
                  key={link.title}
                >
                  {link.title}
                </CustomLink>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}
