import type { AppProps } from 'next/app'
import 'bulma/css/bulma.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/mdc-light-indigo/theme.css'
import 'components/common/loader/loader.css'


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
