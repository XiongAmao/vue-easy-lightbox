import { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
  outDir: path.resolve(process.cwd(), './dist-gh-page')
}

export default config
