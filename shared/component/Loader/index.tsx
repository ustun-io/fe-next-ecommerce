import { SpinStretch } from 'react-cssfx-loading'

interface LoaderProps {
  color: string
  width: string | number
  height: string | number
  duration: string
  loading: boolean
}

const Loader = ({ color, width, height, duration, loading }: LoaderProps) => {
  return (
    <div
      className={`absolute w-full h-full top-0 left-0 bg-primary-light absolute bottom-0 left-0 w-full z-40 flex items-center justify-center transform-gpu transition duration-300 ease-in-out
            ${loading ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-20'}`}
    >
      <SpinStretch className={'mb-32'} color={color} width={width} height={height} duration={duration} />
    </div>
  )
}

Loader.defaultProps = {
  color: '#EBEBEB',
  width: '40px',
  height: '40px',
  duration: '2s'
}

export { Loader }
