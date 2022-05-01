import { FC } from "react"
import { ReactNode } from "react"
import { useEffect } from "react"
import { DefaultLoadingManager } from "three"

export const LoadingProgress: FC<{ children?: ReactNode }> = ({ children }) => {
  useEffect(() => {
    DefaultLoadingManager.onProgress = (url, loaded, number) => {
      console.log("Loader Progress:", url, loaded, number)
    }
  }, [])

  return <>{children}</>
}
