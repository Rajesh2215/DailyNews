import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const SVGComponent = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <Path
      d='M19 1H8.99C7.89 1 7 1.9 7 3H17C18.1 3 19 3.9 19 5V18L21 19V3C21 1.9 20.1 1 19 1Z'
      fill={props.data==true ? '#000000':'#ffffff'}
    />
    <Path
      d='M5 5H15C16.1 5 17 5.9 17 7V23L10 20L3 23V7C3 5.9 3.9 5 5 5Z'
      fill={props.data==true ? '#000000':'#ffffff'}
    />
  </Svg>
)
export default SVGComponent
