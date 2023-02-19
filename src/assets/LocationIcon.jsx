import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"

const SVGComponent = (props) => (
  <Svg
    width={wp(6)}
    height={wp(6)}
    viewBox='0 0 1024 1024'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      fill='#000000'
      d='M512 928c23.936 0 117.504-68.352 192.064-153.152C803.456 661.888 864 535.808 864 416c0-189.632-155.84-320-352-320S160 226.368 160 416c0 120.32 60.544 246.4 159.936 359.232C394.432 859.84 488 928 512 928zm0-435.2a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 140.8a204.8 204.8 0 1 1 0-409.6 204.8 204.8 0 0 1 0 409.6z'
    />
  </Svg>
)
export default SVGComponent
