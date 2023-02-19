import * as React from "react"
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen"
import Svg, { SvgProps, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SVGComponent = (props) => (
  <Svg
    width={wp(6)}
    height={hp(6)}
    viewBox='0 0 512 512'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
    {...props}
  >
    <G id='Page-1' stroke='none' strokeWidth={1} fill='none' fillRule='evenodd'>
      <G
        id='app-main-menu'
        fill='#30C0E9'
        transform='translate(42.666667, 106.666667)'
      >
        <Path
          d='M3.55271368e-14,4.26325641e-14 L426.666667,4.26325641e-14 L426.666667,42.6666667 L3.55271368e-14,42.6666667 L3.55271368e-14,4.26325641e-14 Z M3.55271368e-14,128 L426.666667,128 L426.666667,170.666667 L3.55271368e-14,170.666667 L3.55271368e-14,128 Z M3.55271368e-14,256 L426.666667,256 L426.666667,298.666667 L3.55271368e-14,298.666667 L3.55271368e-14,256 Z'
          id='Combined-Shape'
        />
      </G>
    </G>
  </Svg>
)
export default SVGComponent
