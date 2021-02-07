import siteMetadata from '@/data/siteMetadata'
import {headerNavLinks} from '@/data/headerNavLinks'
import {CustomLink} from '@/components/link'
import {SectionContainer} from '@/components/section-container'
import {Footer} from '@/components/footer'
import {MobileNav} from '@/components/mobile-nav'
import {ThemeSwitch} from '@/components/theme-switch'

export function LayoutWrapper({children}) {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div>
            <CustomLink href="/" aria-label="eckertalex.dev" className="hover:no-underline">
              <div className="flex items-center justify-between">
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="h-6 text-4xl font-semibold text-pink-500">{siteMetadata.headerTitle}</div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </CustomLink>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <CustomLink
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-700 sm:p-4 dark:text-gray-400"
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
